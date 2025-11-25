import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "m6a.jp",
  description: "mktakuya のWebサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="bg-rice-cake">{children}</body>
    </html>
  );
}
