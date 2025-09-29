"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from 'motion/react'

interface PostMetadata {
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
}

interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" aria-label="Back to blog">
          <Button className="cursor-pointer group font-mono">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-all" />
            Back
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1}}
      >
        <h1 className="text-4xl font-extralight mb-8">Recent Thoughts</h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? skeletonArray.map((_, i) => (
                <Card key={i} className="pt-0 animate-pulse">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-8 w-24 rounded" />
                  </CardFooter>
                </Card>
              ))
            : posts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-200 pt-0">
                  {post.metadata.coverImage && (
                    <img
                      src={post.metadata.coverImage}
                      alt={post.metadata.title}
                      className="w-full h-48 object-cover rounded-t-lg block"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{post.metadata.title}</CardTitle>
                    <CardDescription>{post.metadata.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      By {post.metadata.author} • {new Date(post.metadata.date).toLocaleDateString()} • {post.metadata.readTime}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="cursor-pointer">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </motion.div>
    </div>
  );
}
