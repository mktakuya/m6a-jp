import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:px-64">
      <Header />

      <div className="mt-8 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Image className="w-[128px] rounded-full" src="/mktakuya.png" alt="mktakuya のプロフィールアイコン" width={128} height={128} />

          <div className="flex w-full flex-col gap-2 max-lg:text-center">
            <div className="font-sans text-3xl font-bold">
              Takuya Mukohira
              <small className="ml-2 font-semibold text-gray-400">mktakuya</small>
            </div>

            <p>
              北海道千歳市出身のソフトウェアエンジニア /
              <a href="https://yuru28.com" target="_blank" rel="noopener">
                ゆるふわPodcast
              </a>
              のホスト
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-2xl font-semibold text-black">Posts</h2>

          <div className="flex flex-col gap-2 border-gray-200">
            {posts.map((post) => (
              <div key={post.link} className="flex flex-col text-gray-600">
                <div className="font-sans text-lg font-semibold">
                  <a className="text-gray-600 hover:text-gray-900 no-underline" href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </div>
                <div className="font-sans text-sm font-light">
                  {new Date(post.pubDate).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <a className="text-gray-600 hover:text-gray-900 font-sans text-sm" href="https://blog.m6a.jp" target="_blank" rel="noopener noreferrer">
              ブログをもっと見る →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
