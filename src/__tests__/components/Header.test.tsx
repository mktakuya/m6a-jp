import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('ロゴが正しく表示される', () => {
    render(<Header />)
    const logo = screen.getByText('m6a.jp')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  it('Home リンクが正しく表示される', () => {
    render(<Header />)
    const homeLink = screen.getByText('Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('About Me リンクが正しく表示される', () => {
    render(<Header />)
    const aboutLink = screen.getByText('About Me')
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('Misc リンクが正しく表示される', () => {
    render(<Header />)
    const miscLink = screen.getByText('Misc')
    expect(miscLink).toBeInTheDocument()
    expect(miscLink).toHaveAttribute('href', '/misc')
  })

  it('すべてのナビゲーションリンクが表示される', () => {
    render(<Header />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4) // ロゴ + 3つのナビゲーションリンク
  })
})
