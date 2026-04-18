"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fdfdfc]/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-serif italic text-xl text-zinc-900">Palgorithm</Link>
        <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
          <Link href="/archive" className="hover:text-zinc-900 transition-colors">Archive</Link>
          <Link href="/about" className="hover:text-zinc-900 transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}