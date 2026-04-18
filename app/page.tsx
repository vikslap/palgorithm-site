import { client } from '../sanity'

export default async function Home() {
  const data = await client.fetch(`*[_type == "landingPage"][0]`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 text-slate-900">
      <div className="text-center">
        <p className="text-blue-600 font-bold tracking-widest uppercase mb-4">
          Palgorithm.io
        </p>
        <h1 className="text-7xl font-black tracking-tighter mb-6">
          {data?.title || "Project Title"}
        </h1>
        <p className="text-2xl text-slate-500 max-w-2xl mx-auto">
          {data?.tagline || "Your tagline will appear here once fetched."}
        </p>
      </div>
    </main>
  );
}