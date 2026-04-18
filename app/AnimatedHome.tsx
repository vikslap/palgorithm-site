"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedHome({ data, posts }: { data: any, posts: any[] }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#fdfdfc] px-6 text-zinc-900 selection:bg-zinc-200">
      
      {/* Hero Section: The "Cover" of your blog */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl"
        >
          <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8">
            Instructional Design & Logic
          </p>
          
          <h1 className="font-serif italic text-6xl md:text-8xl text-zinc-900 mb-10 tracking-tight leading-[0.85]">
            {data?.title || "Palgorithm"}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-sans text-lg md:text-xl font-light leading-relaxed text-zinc-500 max-w-xl mx-auto"
          >
            {data?.tagline || "Exploring the architecture of learning."}
          </motion.p>

          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-20 h-[1px] w-12 bg-zinc-200 mx-auto"
          />
        </motion.div>
      </section>

      {/* Archive Section: Styled like an editorial column */}
      <section className="w-full max-w-2xl pb-32">
        <div className="border-t border-zinc-100 pt-16">
          <h2 className="font-sans text-[10px] font-bold tracking-[0.3em] text-zinc-300 uppercase mb-16">
            Latest Entries
          </h2>
          
          <div className="space-y-24">
            {posts?.map((post: any) => (
              <motion.article 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="flex flex-col space-y-4">
                  {/* Link wrapper around the title for navigation */}
                  <Link href={`/posts/${post.slug?.current}`}>
                    <h3 className="font-serif text-3xl md:text-4xl italic text-zinc-800 group-hover:text-indigo-600 transition-colors duration-500 cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {post.excerpt && (
                    <p className="font-sans text-base text-zinc-500 leading-relaxed line-clamp-2 font-light">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center pt-2">
                    <Link 
                      href={`/posts/${post.slug?.current}`}
                      className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase group-hover:text-zinc-900 transition-colors"
                    >
                      Read Entry <span className="ml-2 text-zinc-300 transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {(!posts || posts.length === 0) && (
            <p className="font-serif italic text-zinc-300 text-center py-20">
              New entries appearing soon...
            </p>
          )}
        </div>
      </section>
    </main>
  );
}