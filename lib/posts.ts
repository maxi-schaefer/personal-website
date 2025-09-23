import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), "content");

export function getAllPosts() {
    const fileNames = fs.readdirSync(postDirectory);

    return fileNames.map((fileName) => {
        const slug = fileName.replace(".md", "");
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            metadata: data as {
                title: string,
                readTime: string,
                description: string,
                coverImage: string,
                author: string,
                date: string,
            },
            content
        }
    });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postDirectory, `${slug}.md`);
  console.log(fullPath)
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data,
    content,
  };
}