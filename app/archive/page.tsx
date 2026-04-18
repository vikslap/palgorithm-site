import { client } from '../../sanity';
import Link from 'next/link';

export const revalidate = 10;

export default async function ArchivePage() {
  // Fetch ALL posts with titles and excerpts
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt
    }
  `);

  return (
    <main className="min-h-screen bg-[#fdfdfc] text-zinc-900 px-6 pt-32 pb-24 selection:bg-zinc-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Page Header */}
        <header className="mb-20 border-b border-zinc-100 pb-12">
          <h1 className="font-serif italic text-5xl md:text-6xl text-zinc-900 mb-6">
            The Archive
          </h1>
          <p className="font-sans text-sm text-zinc-400 tracking-wide max-w-md">
            Everything I’ve been thinking about lately—from the science of how we learn to the art of how we show it.
          </p>
        </header>

        {/* The List */}
        <div className="space-y-16">
          {posts.map((post: any) => (
            <motion_article key={post._id} className="group">
              <Link href={`/posts/${post.slug}`} className="block">
                {/* Tiny Date Kicker */}
                <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-zinc-300 uppercase mb-3">
                  {post.publishedAt 
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) 
                    : "Recent"}
                </span>
                
                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl italic text-zinc-800 group-hover:text-indigo-600 transition-colors duration-300 mb-4 leading-tight">
                  {post.title}
                </h2>
                
                {/* Excerpt - The 'Hook' */}
                {post.excerpt && (
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                {/* Subtle 'Read' Indicator */}
                <div className="mt-6 flex items-center text-[9px] font-bold tracking-widest text-zinc-300 group-hover:text-zinc-900 transition-colors uppercase">
                  View Full Entry <span className="ml-2 transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            </motion_article>
          ))}
        </div>

        {/* Empty State */}
        {(!posts || posts.length === 0) && (
          <p className="font-serif italic text-zinc-300 text-center py-20">
            The vault is currently empty.
          </p>
        )}
      </div>
    </main>
  );
}