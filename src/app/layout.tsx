import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "트렌드 매거진",
  description:
    "매일 업데이트되는 트렌드 정보, 제품 리뷰, 생활 꿀팁을 전하는 가족 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased" style={{ background: "#F6F1E9", color: "#3A2E2A" }}>
        {/* 헤더 */}
        <header
          className="sticky top-0 z-50 backdrop-blur-sm"
          style={{
            background: "rgba(255, 253, 249, 0.95)",
            borderBottom: "1px solid #E8D8C3",
          }}
        >
          <div className="max-w-[768px] mx-auto px-5 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
              style={{ color: "#3A2E2A" }}
            >
              트렌드 매거진
            </Link>
            <nav className="flex gap-6 text-sm" style={{ color: "#8A7E7A" }}>
              <Link
                href="/"
                className="transition-colors hover:opacity-80"
                style={{ color: "#C8A27E" }}
              >
                홈
              </Link>
              <Link
                href="/categories"
                className="transition-colors hover:opacity-80"
              >
                카테고리
              </Link>
            </nav>
          </div>
        </header>

        {/* 본문 */}
        <main className="max-w-[768px] mx-auto px-5 py-10 min-h-screen">
          {children}
        </main>

        {/* 푸터 */}
        <footer
          className="py-10 text-center text-sm"
          style={{ borderTop: "1px solid #E8D8C3", color: "#8A7E7A" }}
        >
          <div className="max-w-[768px] mx-auto px-5">
            <p className="mb-1">매일 새로운 트렌드와 유용한 정보를 전합니다.</p>
            <p>
              &copy; {new Date().getFullYear()} 트렌드 매거진
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
