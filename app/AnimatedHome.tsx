"use client"; // This tells Next.js this file handles animations

import { motion } from 'framer-motion';

export default function AnimatedHome({ data }: { data: any }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fdfdfc] px-6 text-zinc-900">
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-6">
          Notes on Learning & Logic
        </p>
        
        <h1 className="text-5xl md:text-6xl font-serif italic text-zinc-800 mb-8 leading-tight">
          {data?.title || "Palgorithm"}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-2xl font-light leading-relaxed text-zinc-500 max-w-xl mx-auto"
        >
          {data?.tagline || "Exploring instructional design."}
        </motion.p>
      </motion.div>
    </main>
  );
}