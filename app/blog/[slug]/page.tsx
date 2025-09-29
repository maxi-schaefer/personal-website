// app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { motion } from 'motion/react';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const { title, description, coverImage, date, author } = post.metadata;
  const url = `https://gokimax.dev/blog/${params.slug}`;

  return {
    title: `${title} | Developer Blog`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: date,
      authors: [author],
      images: coverImage ? [{ url: coverImage, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { title, description, coverImage, date, author } = post.metadata;
  const url = `https://gokimax.dev/blog/${params.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: coverImage,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      content: {
        type: "element",
        tagName: "span",
        properties: { className: ["heading-anchor"] },
        children: [{ type: "text", value: "🔗" }],
      },
    })
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      keepBackground: true,
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
        node.properties.className = (node.properties.className || []).concat("line");
      },
      onVisitHighlightedLine(node) {
        node.properties.className = (node.properties.className || []).concat("highlighted");
      },
      transformers: [
        transformerCopyButton()
      ]
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post.content);

  const contentHtml = String(processed);

  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed top-4 left-4 z-50">
        <Link href="/blog" aria-label="Back to blog">
          <Button className="cursor-pointer group font-mono">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-all" />
            View all Posts
          </Button>
        </Link>
      </div>
      <article className="max-w-4xl mx-auto px-6 py-16">
        {post.metadata.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
          </div>
        )}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            {post.metadata.title}
          </h1>
          <p className="text-sm text-gray-500">
            By {post.metadata.author} ·{" "}
            {post.metadata.date
              ? new Date(post.metadata.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : null}
          </p>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
