import { client } from '../sanity';
import AnimatedHome from './AnimatedHome';

export const revalidate = 10;

export default async function Home() {
  const query = `{
    "landing": *[_type == "landingPage"][0],
    "posts": *[_type == "post"] | order(publishedAt desc) [0...5]
  }`;
  
  // We add an empty object fallback {} to prevent "undefined" errors
  const data = (await client.fetch(query)) || {};

  return (
    <AnimatedHome 
      data={data.landing || {}} 
      posts={data.posts || []} 
    />
  );
}