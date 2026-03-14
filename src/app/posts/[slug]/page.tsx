import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "페이지를 찾을 수 없습니다" };

  return {
    title: `${post.title} | 트렌드 매거진`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* 뒤로가기 */}
      <Link
        href="/"
        className="inline-flex items-center text-sm transition-colors mb-8"
        style={{ color: "#A09890" }}
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        목록으로
      </Link>

      {/* 포스트 헤더 */}
      <header
        className="mb-10 rounded-2xl p-8"
        style={{ background: "#FFFDF9", border: "1px solid #E8D8C3" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "#E8D8C3", color: "#6A5E5A" }}
          >
            {post.category}
          </span>
          <time className="text-sm" style={{ color: "#A09890" }}>
            {post.date}
          </time>
          <span className="text-sm" style={{ color: "#A09890" }}>
            {post.readingTime}
          </span>
        </div>
        <h1
          className="text-2xl md:text-3xl font-extrabold leading-snug"
          style={{ color: "#3A2E2A" }}
        >
          {post.title}
        </h1>
      </header>

      {/* 포스트 본문 */}
      <div
        className="prose max-w-none rounded-2xl p-6 md:p-8"
        style={{ background: "#FFFDF9", border: "1px solid #E8D8C3" }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* 하단 네비게이션 */}
      <div
        className="mt-8 pt-8 text-center"
        style={{ borderTop: "1px solid #E8D8C3" }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium transition-colors"
          style={{ color: "#C8A27E" }}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          다른 글 보기
        </Link>
      </div>
    </article>
  );
}
