import { client } from '../sanity'; 
import AnimatedHome from '@/app/AnimatedHome';

export const revalidate = 10;

// This defines the "shape" of your data so TypeScript stays happy
interface HomeData {
  landing: {
    title?: string;
    tagline?: string;
  };
  posts: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    category?: string;
    tags?: string[];
    publishedAt?: string;
  }[];
}

export default async function Home() {
  const query = `{
    "landing": *[_type == "landingPage"][0],
    "posts": *[_type == "post"] | order(publishedAt desc) [0...5] {
      _id,
      title,
      slug,
      excerpt,
      category,
      tags,
      publishedAt
    }
  }`;
  
  // Fetching with the <HomeData> type ensures everything is recognized
  const data = await client.fetch<HomeData>(query) || { landing: { title: "", tagline: "" }, posts: [] };

  return (
    <AnimatedHome 
      data={data.landing} 
      posts={data.posts} 
    />
  );
}