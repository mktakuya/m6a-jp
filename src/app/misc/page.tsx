import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Misc - m6a.jp",
  description: "その他の情報",
};

export default function MiscPage() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:px-64">
      <Header />

      <div className="mt-8 flex flex-col gap-12">
        <div className="prose prose-lg">
          <h1>Misc</h1>

          <p>その他の情報をまとめています。</p>

          <h2>リンク集</h2>
          <ul>
            <li>
              <a href="https://yuru28.com" target="_blank" rel="noopener noreferrer">
                ゆるふわPodcast
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
