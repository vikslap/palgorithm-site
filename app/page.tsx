"use client";

export const revalidate = 10;

import { client } from '../sanity';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "landingPage"][0]`).then(setData);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fdfdfc] px-6 text-zinc-900 selection:bg-indigo-100">
      
      {/* Very subtle top border for a "stationery" feel */}
      <div className="absolute top-0 h-1 w-full bg-zinc-100" />

      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-6">
            Notes on Learning & Logic
          </p>
          
          <h1 className="text-5xl md:text-6xl font-serif italic text-zinc-800 mb-8 leading-tight">
            {data?.title || "Palgorithm"}
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-500 max-w-xl mx-auto">
              {data?.tagline || "Exploring the intersection of instructional design and systematic thinking."}
            </p>
          </motion.div>
        </header>

        {/* This will eventually be your "Latest Posts" trigger */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="pt-12 border-t border-zinc-100"
        >
          <a href="#blog" className="group text-sm font-medium text-zinc-400 hover:text-indigo-600 transition-colors duration-300">
            Read the entries <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.footer>
      </motion.div>
    </main>
  );
}