import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full flex-col justify-between gap-4 border-b border-gray-200 pb-4">
      <h1>
        <Link href="/" className="font-sans text-4xl font-bold text-black no-underline hover:text-black">
          m6a.jp
        </Link>
      </h1>

      <nav className="flex flex-row gap-4">
        <Link href="/" className="font-sans text-lg text-gray-600 no-underline hover:text-gray-600">
          Home
        </Link>
        <Link href="/about" className="font-sans text-lg text-gray-600 no-underline hover:text-gray-600">
          About Me
        </Link>
        <Link href="/posts" className="font-sans text-lg text-gray-600 no-underline hover:text-gray-600">
          Posts
        </Link>
        <Link href="/misc" className="font-sans text-lg text-gray-600 no-underline hover:text-gray-600">
          Misc
        </Link>
      </nav>
    </header>
  );
}
