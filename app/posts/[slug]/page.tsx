import { client } from '../../../sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Lightbulb, Info, AlertTriangle } from 'lucide-react';
import BodyAccordion from '@/app/components/BodyAccordion'; 
import VideoPlayer from '@/app/components/VideoPlayer'; 
import Image from 'next/image';
import { urlFor } from '@/sanity';

export const revalidate = 10;

const ptComponents: any = {
  types: {
    image: ({ value }: any) => {
      // 1. Map Sizes to widths
      const sizeClasses: any = {
        standard: 'max-w-2xl mx-auto',
        wide: 'max-w-5xl -mx-4 md:-mx-32', // Negative margins pull it wider than text
        small: 'max-w-sm mx-auto',
      };

      // 2. Map Alignment to floats (ignored if 'wide' is selected)
      const alignClasses: any = {
        left: 'md:float-left md:mr-8 md:mb-4',
        right: 'md:float-right md:ml-8 md:mb-4',
        center: 'mx-auto text-center',
      };

      const selectedSize = sizeClasses[value.size] || sizeClasses.standard;
      const selectedAlign = value.size !== 'wide' ? (alignClasses[value.align] || '') : '';

      return (
        <figure className={`my-12 clear-both ${selectedSize} ${selectedAlign}`}>
          <Image 
            src={urlFor(value).url()} 
            alt={value.alt || "Palgorithm visual"} 
            width={1400} // High base for wide shots
            height={800} 
            className="rounded-xl shadow-md w-full object-cover"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-[11px] text-zinc-400 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }: any) => {
      if (!value?.url) return null;
      return (
        <div className="my-12">
          <VideoPlayer url={value.url} />
          {value.caption && (
            <p className="mt-3 text-center text-xs text-zinc-400 italic">{value.caption}</p>
          )}
        </div>
      );
    },
    codeBlock: ({ value }: any) => (
      <div className="my-8 rounded-lg overflow-hidden text-sm shadow-sm">
        <div className="bg-zinc-800 text-zinc-400 px-4 py-2 text-[9px] font-black uppercase tracking-widest border-b border-zinc-700 flex justify-between">
          <span>{value.language || 'code'}</span>
        </div>
        <SyntaxHighlighter 
          language={value.language === 'pinescript' ? 'typescript' : value.language} 
          style={coldarkDark} 
          customStyle={{ margin: 0, padding: '1.5rem' }}
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
    callout: ({ value }: any) => {
      const variants: any = {
        Tip: { bg: 'bg-emerald-50', text: 'text-emerald-900', icon: <Lightbulb size={18} className="text-emerald-600" /> },
        'Logic Note': { bg: 'bg-indigo-50', text: 'text-indigo-900', icon: <Info size={18} className="text-indigo-600" /> },
        Warning: { bg: 'bg-amber-50', text: 'text-amber-900', icon: <AlertTriangle size={18} className="text-amber-600" /> },
      };
      const variant = variants[value.type] || variants['Logic Note'];
      return (
        <div className={`flex gap-4 p-6 my-8 rounded-xl border border-white/50 ${variant.bg} ${variant.text}`}>
          <div className="shrink-0 mt-0.5">{variant.icon}</div>
          <p className="font-sans text-sm leading-relaxed m-0">{value.text}</p>
        </div>
      );
    },
    accordion: ({ value }: any) => (
      <BodyAccordion title={value.title}>
        <PortableText value={value.content} components={ptComponents} />
      </BodyAccordion>
    ),
  }
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      excerpt,
      body[] {
        ...,
        _type == "videoEmbed" => {
          url,
          caption
        }
      },
      category,
      tags
    }
  `, { slug });

  if (!post) return <div className="min-h-screen flex items-center justify-center font-serif italic text-zinc-400">Entry not found.</div>;

  return (
    <article className="min-h-screen bg-[#fdfdfc] text-zinc-900 selection:bg-zinc-200 px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <header className="mb-20">
          <Link href="/archive" className="inline-block mb-12 text-[10px] font-bold tracking-[0.3em] text-zinc-300 uppercase hover:text-zinc-900 transition-colors">
            ← Back to Archive
          </Link>
          
          {post.category && (
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">
              {post.category}
            </p>
          )}

          <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recent Entry"}
          </p>
          
          <h1 className="font-serif italic text-5xl md:text-7xl text-zinc-900 mb-10 leading-[0.9] tracking-tight">
            {post.title}
          </h1>
          
          {post.excerpt && <p className="text-xl md:text-2xl font-light text-zinc-400 italic leading-relaxed">{post.excerpt}</p>}
        </header>

        <div className="font-sans text-lg leading-relaxed text-zinc-800 prose prose-zinc prose-indigo max-w-none">
          <PortableText value={post.body} components={ptComponents} />
        </div>

        {/* Updated Tag Badge Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-zinc-100">
            <p className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase mb-4">Filed Under</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full border border-zinc-200 text-[11px] font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-20 pt-12 border-t border-zinc-100 flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">© Palgorithm 2026</span>
          <Link href="/" className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase hover:text-zinc-900 transition-colors">Return Home</Link>
        </footer>
      </div>
    </article>
  );
}