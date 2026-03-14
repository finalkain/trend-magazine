import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "카테고리 | 트렌드 매거진",
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  const categoryMap: Record<string, typeof posts> = {};
  for (const post of posts) {
    if (!categoryMap[post.category]) {
      categoryMap[post.category] = [];
    }
    categoryMap[post.category].push(post);
  }

  const categories = Object.keys(categoryMap).sort();

  return (
    <div>
      <h1
        className="text-3xl font-extrabold mb-8"
        style={{ color: "#3A2E2A" }}
      >
        카테고리
      </h1>

      {categories.length === 0 ? (
        <p style={{ color: "#8A7E7A" }}>아직 카테고리가 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <section
              key={category}
              className="rounded-2xl p-6"
              style={{ background: "#FFFDF9", border: "1px solid #E8D8C3" }}
            >
              <h2
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: "#3A2E2A" }}
              >
                <span style={{ color: "#C8A27E" }}>#</span>
                {category}
                <span
                  className="text-sm font-normal"
                  style={{ color: "#A09890" }}
                >
                  ({categoryMap[category].length})
                </span>
              </h2>
              <div
                className="space-y-0 divide-y"
                style={{ borderColor: "#EDE6DA" }}
              >
                {categoryMap[category].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block py-3 group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className="text-base font-medium truncate transition-colors group-hover:text-[#C8A27E]"
                        style={{ color: "#4A3E3A" }}
                      >
                        {post.title}
                      </span>
                      <time
                        className="text-xs whitespace-nowrap"
                        style={{ color: "#A09890" }}
                      >
                        {post.date}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
