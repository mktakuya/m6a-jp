import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('コピーライト表記が正しく表示される', () => {
    render(<Footer />)
    const copyright = screen.getByText('© 2025 mktakuya')
    expect(copyright).toBeInTheDocument()
  })

  it('X (Twitter) リンクが正しく表示される', () => {
    const { container } = render(<Footer />)
    const xLink = container.querySelector('a[href="https://x.com/mktakuya"]')
    expect(xLink).toBeInTheDocument()
    expect(xLink).toHaveAttribute('target', '_blank')
    expect(xLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('GitHub リンクが正しく表示される', () => {
    const { container } = render(<Footer />)
    const githubLink = container.querySelector('a[href="https://github.com/mktakuya"]')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('SNS リンクが2つ表示される', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) // X と GitHub
  })

  it('SNS アイコンが SVG で表示される', () => {
    const { container } = render(<Footer />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(2) // X と GitHub のアイコン
  })
})
