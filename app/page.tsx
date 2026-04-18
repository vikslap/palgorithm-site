import { client } from '../sanity';
import AnimatedHome from './AnimatedHome';

// This stays here because it's a server-side instruction
export const revalidate = 10;

export default async function Home() {
  const data = await client.fetch(`*[_type == "landingPage"][0]`);

  // We fetch the data here and "hand it over" to the animated component
  return <AnimatedHome data={data} />;
}