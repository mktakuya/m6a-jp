export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch("https://blog.m6a.jp/feed", {
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Atom feed: ${response.status}`);
    }

    const xmlText = await response.text();

    // XMLから<entry>タグを抽出 (Atom形式)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const items: BlogPost[] = [];
    let match;

    while ((match = entryRegex.exec(xmlText)) !== null && items.length < 5) {
      const entryContent = match[1];

      // Atom形式: <title>タイトル</title>
      const titleMatch = entryContent.match(/<title>(.*?)<\/title>/);
      // Atom形式: <link href="URL" /> または <link href="URL"/>
      const linkMatch = entryContent.match(/<link\s+href="(.*?)"/);
      // Atom形式: <published>日時</published> または <updated>日時</updated>
      const pubDateMatch = entryContent.match(/<published>(.*?)<\/published>/) || entryContent.match(/<updated>(.*?)<\/updated>/);

      if (titleMatch && linkMatch && pubDateMatch) {
        items.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: pubDateMatch[1],
        });
      }
    }

    return items;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}
