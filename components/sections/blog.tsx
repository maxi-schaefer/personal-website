"use client";

import React, { RefObject, useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  metadata: {
    title: string;
    description: string;
    coverImage?: string;
    date?: string;
    readTime?: string;
    author?: string;
  };
};

type BlogSectionProps = {
  sectionsRef: RefObject<(HTMLElement | null)[]>;
};

export default function BlogSection({ sectionsRef }: BlogSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts/recent")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="blogs"
      ref={(el) => {
        sectionsRef.current[2] = el;
      }}
      className="min-h-screen py-12 sm:py-32 mx-auto opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light my-0">Recent Thoughts</h2>
        <Link
          href="/blog"
          className="font-mono group mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span>View all Posts</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        <div className="flex flex-wrap gap-6 sm:gap-8 justify-start">
          {posts.map((post) => (
            <Link
              key={post.metadata.title}
              href={`/blog/${post.slug.replace(".md", "")}`}
              className="w-full sm:w-[48%] cursor-pointer group shadow-2xs hover:-translate-y-2 transition-transform duration-300"
            >
              <article className="p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 text-muted-foreground font-mono h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{post.metadata.date}</span>
                    <span>{post.metadata.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-foreground text-muted-foreground transition-colors duration-500">
                    {post.metadata.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {post.metadata.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
