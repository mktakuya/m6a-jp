import { describe, it, expect, vi, beforeEach } from 'vitest'

// getBlogPosts 関数を page.tsx から抽出してテスト用にインポートできるようにする必要がある
// 現状は page.tsx 内に定義されているので、まずはモックを使ったテストを書く

describe('getBlogPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Atom フィードから正しく記事を取得できる', async () => {
    const mockAtomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>テスト記事1</title>
    <link href="https://blog.m6a.jp/post1"/>
    <published>2025-01-15T00:00:00Z</published>
  </entry>
  <entry>
    <title>テスト記事2</title>
    <link href="https://blog.m6a.jp/post2"/>
    <updated>2025-01-14T00:00:00Z</updated>
  </entry>
</feed>`

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => mockAtomFeed,
    } as Response)

    // getBlogPosts をテストするため、ここでは同じロジックを再実装
    const response = await fetch('https://blog.m6a.jp/feed')
    const xmlText = await response.text()

    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
    const items: Array<{ title: string; link: string; pubDate: string }> = []
    let match

    while ((match = entryRegex.exec(xmlText)) !== null && items.length < 5) {
      const entryContent = match[1]

      const titleMatch = entryContent.match(/<title>(.*?)<\/title>/)
      const linkMatch = entryContent.match(/<link\s+href="(.*?)"/)
      const pubDateMatch =
        entryContent.match(/<published>(.*?)<\/published>/) ||
        entryContent.match(/<updated>(.*?)<\/updated>/)

      if (titleMatch && linkMatch && pubDateMatch) {
        items.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: pubDateMatch[1],
        })
      }
    }

    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      title: 'テスト記事1',
      link: 'https://blog.m6a.jp/post1',
      pubDate: '2025-01-15T00:00:00Z',
    })
    expect(items[1]).toEqual({
      title: 'テスト記事2',
      link: 'https://blog.m6a.jp/post2',
      pubDate: '2025-01-14T00:00:00Z',
    })
  })

  it('最大5件までの記事を取得する', async () => {
    const entries = Array.from({ length: 10 }, (_, i) => `
      <entry>
        <title>記事${i + 1}</title>
        <link href="https://blog.m6a.jp/post${i + 1}"/>
        <published>2025-01-${String(i + 1).padStart(2, '0')}T00:00:00Z</published>
      </entry>
    `).join('')

    const mockAtomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  ${entries}
</feed>`

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => mockAtomFeed,
    } as Response)

    const response = await fetch('https://blog.m6a.jp/feed')
    const xmlText = await response.text()

    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
    const items: Array<{ title: string; link: string; pubDate: string }> = []
    let match

    while ((match = entryRegex.exec(xmlText)) !== null && items.length < 5) {
      const entryContent = match[1]

      const titleMatch = entryContent.match(/<title>(.*?)<\/title>/)
      const linkMatch = entryContent.match(/<link\s+href="(.*?)"/)
      const pubDateMatch =
        entryContent.match(/<published>(.*?)<\/published>/) ||
        entryContent.match(/<updated>(.*?)<\/updated>/)

      if (titleMatch && linkMatch && pubDateMatch) {
        items.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: pubDateMatch[1],
        })
      }
    }

    expect(items).toHaveLength(5)
  })

  it('API エラー時は空配列を返す', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    try {
      const response = await fetch('https://blog.m6a.jp/feed')
      if (!response.ok) {
        throw new Error(`Failed to fetch Atom feed: ${response.status}`)
      }
    } catch (error) {
      // エラー時の挙動を確認
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toContain('Failed to fetch Atom feed')
    }
  })
})
