import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Posts - m6a.jp",
  description: "投稿一覧",
};

export default function PostsPage() {
  // サンプルの投稿データ
  const posts = [
    { title: "サンプル記事 1", date: "2025-01-15", slug: "sample-1" },
    { title: "サンプル記事 2", date: "2025-01-10", slug: "sample-2" },
    { title: "サンプル記事 3", date: "2025-01-05", slug: "sample-3" },
  ];

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:px-64">
      <Header />

      <div className="mt-8 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="font-sans text-3xl font-bold text-black">Posts</h1>

          <div className="flex flex-col gap-2 border-gray-200">
            {posts.map((post) => (
              <div key={post.slug} className="flex flex-col text-gray-600">
                <div className="font-sans text-lg font-semibold">
                  <Link className="text-gray-600 hover:text-gray-900 no-underline" href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </div>
                <div className="font-sans text-sm font-light">{post.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
