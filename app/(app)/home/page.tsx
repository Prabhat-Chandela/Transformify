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
    } finally{
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos])

  return (
    <div>Home</div>
  )
}

export default Home;