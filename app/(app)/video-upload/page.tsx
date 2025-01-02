"use client"

import React from 'react';
import VideoDragDrop from '@/Components/VideoDragDrop';

function VideoUpload() {
  return (

    <main className="container max-w-screen-lg grid gap-2 lg:gap-6 p-2">

      <section className='w-full h-fit overflow-hidden'>

        <VideoDragDrop />

      </section>

      <section className='w-full grid gap-4'>

        <div className="form-control bg-base-200 rounded-md p-2">
          <label className="label">
            <span className="label-text">Add a video title</span>
          </label>
          <input type="text" placeholder="Title" className="input input-bordered w-full" />
        </div>

        <div className="form-control bg-base-200 rounded-md p-2">
          <label className="label">
            <span className="label-text">Add a video Description</span>
          </label>
          <textarea className="textarea textarea-bordered" placeholder="Description"></textarea>
        </div>

      </section>

    </main>


  )
}

export default VideoUpload;