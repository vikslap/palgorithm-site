import { client } from '../../../sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

export const revalidate = 10;

// Next.js 15 requires params to be a Promise
export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  // 1. Wait for the URL parameters to be ready
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. Fetch only the post that matches the current URL slug
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]
  `, { slug });

  // 3. Handle the "Not Found" state elegantly
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif italic text-zinc-400 bg-[#fdfdfc]">
        Entry not found.
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#fdfdfc] text-zinc-900 selection:bg-zinc-200 px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        
        <header className="mb-20">
          <Link href="/archive" className="inline-block mb-12 text-[10px] font-bold tracking-[0.3em] text-zinc-300 uppercase hover:text-zinc-900 transition-colors">
            ← Back to Archive
          </Link>
          
          <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8">
            {post.publishedAt 
              ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
              : "Recent Entry"}
          </p>
          
          <h1 className="font-serif italic text-5xl md:text-7xl text-zinc-900 mb-10 leading-[0.9] tracking-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl md:text-2xl font-light text-zinc-400 italic leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* The body content from Sanity's Block Editor */}
        <div className="font-sans text-lg leading-relaxed text-zinc-800 space-y-8 prose prose-zinc prose-indigo">
          <PortableText value={post.body} />
        </div>

        <footer className="mt-32 pt-12 border-t border-zinc-100 flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
            © Palgorithm 2026
          </span>
          <Link href="/" className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase hover:text-zinc-900 transition-colors">
            Return Home
          </Link>
        </footer>

      </div>
    </article>
  );
}