import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getBlogPosts } from '@/lib/blog'

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

    const posts = await getBlogPosts()

    expect(posts).toHaveLength(2)
    expect(posts[0]).toEqual({
      title: 'テスト記事1',
      link: 'https://blog.m6a.jp/post1',
      pubDate: '2025-01-15T00:00:00Z',
    })
    expect(posts[1]).toEqual({
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

    const posts = await getBlogPosts()

    expect(posts).toHaveLength(5)
  })

  it('API エラー時は空配列を返す', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    const posts = await getBlogPosts()

    expect(posts).toEqual([])
  })

  it('ネットワークエラー時は空配列を返す', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const posts = await getBlogPosts()

    expect(posts).toEqual([])
  })
})
