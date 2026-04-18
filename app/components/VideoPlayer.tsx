"use client";
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ url }: { url: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="aspect-video bg-zinc-100 animate-pulse rounded-xl" />;

  // LOGIC: If it's a YouTube URL, use a native Embed for 100% reliability
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  if (isYouTube) {
    // Convert watch URL to Embed URL
    const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Fallback for other video types
  const Player = ReactPlayer as any;
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
      <Player url={url} width="100%" height="100%" controls />
    </div>
  );
}