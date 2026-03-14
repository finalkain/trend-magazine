import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "트렌드 매거진",
  description:
    "매일 업데이트되는 트렌드 정보, 제품 리뷰, 생활 꿀팁을 전하는 블로그",
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
      <body className="bg-white text-gray-800 antialiased">
        {/* 헤더 */}
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
          <div className="max-w-[768px] mx-auto px-5 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 tracking-tight"
            >
              트렌드 매거진
            </Link>
            <nav className="flex gap-6 text-sm text-gray-500">
              <Link
                href="/"
                className="hover:text-gray-900 transition-colors"
              >
                홈
              </Link>
              <Link
                href="/categories"
                className="hover:text-gray-900 transition-colors"
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
        <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          <div className="max-w-[768px] mx-auto px-5">
            <p>
              &copy; {new Date().getFullYear()} 트렌드 매거진. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
