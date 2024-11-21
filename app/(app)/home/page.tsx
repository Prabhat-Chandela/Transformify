"use client"

import React, { useState, useEffect, useCallback } from 'react';


interface Video {
  id: string;
  title: string;
  description?: string;
  publicId: string;
  originalSize: string;
  compressedSize: string;
  duration: number;
  createdAt: Date
}

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch("/api/videos")
      if (!response.ok) setError("Failed to Fetch the videos");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setVideos(data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to Fetch the videos");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos])

  return (
    <section className='grid sm:grid-cols-12'>
      <div className='w-full sm:col-span-8 xl:col-span-9'></div>
      {videos.map((video, index) => (
        <div key={video.id} className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Home;