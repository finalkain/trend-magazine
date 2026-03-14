import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "카테고리 | 트렌드 매거진",
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  // 카테고리별 그룹핑
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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">카테고리</h1>

      {categories.length === 0 ? (
        <p className="text-gray-400">아직 카테고리가 없습니다.</p>
      ) : (
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">#</span>
                {category}
                <span className="text-sm font-normal text-gray-400">
                  ({categoryMap[category].length})
                </span>
              </h2>
              <div className="space-y-0 divide-y divide-gray-50">
                {categoryMap[category].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block py-3 group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-base text-gray-700 group-hover:text-orange-500 transition-colors font-medium truncate">
                        {post.title}
                      </span>
                      <time className="text-xs text-gray-400 whitespace-nowrap">
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
