import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {/* 히어로 */}
      <section className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          트렌드 매거진
        </h1>
        <p className="text-gray-500 text-lg">
          매일 새로운 트렌드와 유용한 정보를 전합니다.
        </p>
      </section>

      {/* 포스트 리스트 */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">아직 작성된 글이 없습니다.</p>
          <p className="text-sm mt-2">곧 새로운 콘텐츠가 올라올 예정이에요!</p>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-gray-100">
          {posts.map((post) => (
            <article key={post.slug} className="py-7 first:pt-0">
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <time className="text-xs text-gray-400">{post.date}</time>
                  <span className="text-xs text-gray-400">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-1.5">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
