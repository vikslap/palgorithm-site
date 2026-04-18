"use client";

import { useEffect, useState } from 'react';
import { client } from '../../sanity';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArchivePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          publishedAt
        }
      `);
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#fdfdfc] text-zinc-900 px-6 pt-32 pb-24 selection:bg-zinc-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Page Header */}
        <header className="mb-20 border-b border-zinc-100 pb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif italic text-5xl md:text-6xl text-zinc-900 mb-6"
          >
            The Archive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-zinc-400 tracking-wide max-w-md leading-relaxed"
          >
            Everything I’ve been thinking about lately—from the science of how we learn to the art of how we show it.
          </motion.p>
        </header>

        {/* The List */}
        <div className="space-y-16">
          {posts.map((post: any, index: number) => (
            <motion.article 
              key={post._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="group"
            >
              <Link href={`/posts/${post.slug}`} className="block">
                <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-zinc-300 uppercase mb-3">
                  {post.publishedAt 
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) 
                    : "Recent"}
                </span>
                
                <h2 className="font-serif text-2xl md:text-3xl italic text-zinc-800 group-hover:text-indigo-600 transition-colors duration-300 mb-4 leading-tight">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="mt-6 flex items-center text-[9px] font-bold tracking-widest text-zinc-300 group-hover:text-zinc-900 transition-colors uppercase">
                  View Full Entry <span className="ml-2 transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="font-serif italic text-zinc-300 text-center py-20">
            The vault is currently empty.
          </p>
        )}
      </div>
    </main>
  );
}