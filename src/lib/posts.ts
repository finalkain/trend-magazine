import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  keyword: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);
      const excerpt =
        content
          .replace(/[#*\[\]`>_~\-|]/g, "")
          .replace(/\n+/g, " ")
          .trim()
          .slice(0, 160) + "...";

      return {
        slug,
        title: data.title || slug,
        date: data.date || "날짜 없음",
        category: data.category || "일반",
        excerpt,
        readingTime: stats.text.replace("min read", "분"),
        keyword: data.keyword || "",
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensurePostsDirectory();
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const stats = readingTime(content);

  const excerpt =
    content
      .replace(/[#*\[\]`>_~\-|]/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 160) + "...";

  return {
    slug,
    title: data.title || slug,
    date: data.date || "날짜 없음",
    category: data.category || "일반",
    excerpt,
    readingTime: stats.text.replace("min read", "분"),
    keyword: data.keyword || "",
    contentHtml,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
  ensurePostsDirectory();
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
