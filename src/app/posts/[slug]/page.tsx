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
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
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
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <time className="text-sm text-gray-400">{post.date}</time>
          <span className="text-sm text-gray-400">{post.readingTime}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-snug mb-4">
          {post.title}
        </h1>
        <div className="h-px bg-gray-100" />
      </header>

      {/* 포스트 본문 */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* 하단 네비게이션 */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
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
