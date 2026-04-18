"use client";

import { useEffect, useState } from 'react';
import { client } from '../../sanity';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArchivePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all"); // Use lowercase "all"

  // 1. Updated: Use objects to map the Title to the Value
  const categories = [
    { title: "All", value: "all" },
    { title: "Strategy & Theory", value: "strategy-theory" },
    { title: "Design & Development", value: "design-development" },
    { title: "Tech & Tools", value: "tech-tools" },
    { title: "Leadership & Operations", value: "leadership-operations" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          category,
          tags,
          publishedAt
        }
      `);
      setPosts(data);
    };
    fetchData();
  }, []);

  // 2. Updated Filter Logic: Compare against the data value
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fdfdfc] text-zinc-900 px-6 pt-32 pb-24 selection:bg-zinc-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Page Header */}
        <header className="mb-12">
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

        {/* 3. Updated Filter Bar: Uses cat.value and cat.title */}
        <nav className="flex flex-wrap gap-x-6 gap-y-3 mb-20 border-b border-zinc-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                activeCategory === cat.value 
                ? "text-indigo-600 border-b border-indigo-600 pb-1" 
                : "text-zinc-300 hover:text-zinc-900"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </nav>

        {/* The List remains the same */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post: any, index: number) => (
              <motion.article 
                key={post._id} 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="group"
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-zinc-300 uppercase">
                      {post.publishedAt 
                        ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) 
                        : "Recent"}
                    </span>
                    {post.category && (
                      <>
                        <span className="text-zinc-200 text-[10px]">•</span>
                        <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] bg-zinc-100 text-indigo-400 rounded-sm">
                          {/* Map the value back to a Title for the badge if you want, 
                              or just use post.category for the raw value */}
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl italic text-zinc-800 group-hover:text-indigo-600 transition-colors duration-300 mb-4 leading-tight">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && (
                    <div className="mt-4 flex gap-3">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] text-zinc-300 font-light italic">#{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-6 flex items-center text-[9px] font-bold tracking-widest text-zinc-300 group-hover:text-zinc-900 transition-colors uppercase">
                    View Full Entry <span className="ml-2 transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <p className="font-serif italic text-zinc-300 text-center py-20">
            No entries found in this category.
          </p>
        )}
      </div>
    </main>
  );
}