import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Me - m6a.jp",
  description: "Takuya Mukohira (mktakuya) について",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:px-64">
      <Header />

      <div className="mt-8 flex flex-col gap-12">
        <div className="prose prose-lg">
          <h1>About Me</h1>

          <h2>自己紹介</h2>
          <ul>
            <li>向平 卓矢 / Takuya Mukohira</li>
            <li>mktakuya</li>
          </ul>

          <div className="flex items-center gap-4">
            <Image className="w-[96px] rounded-2xl" src="/mktakuya.png" alt="mktakuya のプロフィールアイコン" width={96} height={96} />
            <Image className="w-[96px] rounded-2xl" src="/mktakuya2.jpg" alt="mktakuya のプロフィールアイコン2" width={96} height={96} />
          </div>

          <p>
            北海道千歳市生まれのソフトウェアエンジニア。バックエンド寄り。
            <br />
            苫小牧高専 情報工学科 卒業、専攻科 修了。
          </p>

          <p>
            高専時代の友人とPodcastをやっています。
            <br />
            <a href="https://yuru28.com" target="_blank" rel="noopener noreferrer">
              ゆるふわPodcast
            </a>
          </p>

          <h3>職業</h3>

          <p>
            <strong>ソフトウェアエンジニア</strong>
          </p>

          <p>
            キャリアのほとんどをWebアプリケーションの開発経験が占めています。
            <br />
            Ruby / Rails でのバックエンドの開発、TypeScript / ReactによるSPAの開発が多いです。
          </p>

          <p>
            仕事文脈の詳細なプロフィールはLAPRASからどうぞ。
            <br />
            <a href="https://lapras.com/public/mktakuya" target="_blank" rel="noopener noreferrer">
              https://lapras.com/public/mktakuya
            </a>
          </p>

          <h3>住居</h3>

          <ul>
            <li>
              2021年〜現在
              <ul>
                <li>神奈川県横浜市</li>
              </ul>
            </li>
            <li>
              2019年〜2021年
              <ul>
                <li>東京都杉並区</li>
              </ul>
            </li>
            <li>
              1996年〜2019年
              <ul>
                <li>北海道千歳市</li>
              </ul>
            </li>
          </ul>

          <h3>各種リンク</h3>

          <ul>
            <li>
              X:{" "}
              <a href="https://x.com/mktakuya" target="_blank" rel="noopener noreferrer">
                @mktakuya
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a href="https://github.com/mktakuya" target="_blank" rel="noopener noreferrer">
                mktakuya
              </a>
            </li>
            <li>
              LAPRAS:{" "}
              <a href="https://lapras.com/public/mktakuya" target="_blank" rel="noopener noreferrer">
                mktakuya
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
