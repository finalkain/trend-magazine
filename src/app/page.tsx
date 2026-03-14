import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {/* 히어로 */}
      <section className="mb-12 text-center py-6">
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ color: "#3A2E2A" }}
        >
          트렌드 매거진
        </h1>
        <p style={{ color: "#8A7E7A" }} className="text-lg">
          우리 가족의 일상에 도움이 되는 트렌드와 정보를 매일 전합니다.
        </p>
      </section>

      {/* 포스트 리스트 */}
      {posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#8A7E7A" }}>
          <p className="text-lg">아직 작성된 글이 없습니다.</p>
          <p className="text-sm mt-2">곧 새로운 콘텐츠가 올라올 예정이에요!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl p-6 transition-shadow hover:shadow-md"
              style={{ background: "#FFFDF9", border: "1px solid #E8D8C3" }}
            >
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "#E8D8C3", color: "#6A5E5A" }}
                  >
                    {post.category}
                  </span>
                  <time className="text-xs" style={{ color: "#A09890" }}>
                    {post.date}
                  </time>
                  <span className="text-xs" style={{ color: "#A09890" }}>
                    {post.readingTime}
                  </span>
                </div>
                <h2
                  className="text-lg font-bold mb-2 transition-colors"
                  style={{ color: "#3A2E2A" }}
                >
                  <span className="group-hover:text-[#C8A27E] transition-colors">
                    {post.title}
                  </span>
                </h2>
                <p
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "#6A5E5A" }}
                >
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
