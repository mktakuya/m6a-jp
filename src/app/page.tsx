import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
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
      </div>

      <Footer />
    </div>
  );
}
