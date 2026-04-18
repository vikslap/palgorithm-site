import { client } from '../sanity';
// We use the @ alias to tell TypeScript exactly where to look from the root
import AnimatedHome from '@/app/AnimatedHome';

export const revalidate = 10;

// Defining the 'shape' of our data helps TypeScript stay calm
interface HomeData {
  landing: {
    title?: string;
    tagline?: string;
  };
  posts: any[];
}

export default async function Home() {
  const query = `{
    "landing": *[_type == "landingPage"][0],
    "posts": *[_type == "post"] | order(publishedAt desc) [0...5]
  }`;
  
  // We fetch with the <HomeData> type to ensure data.landing and data.posts are recognized
  const data = await client.fetch<HomeData>(query) || { landing: {}, posts: [] };

  return (
    <AnimatedHome 
      data={data.landing} 
      posts={data.posts} 
    />
  );
}