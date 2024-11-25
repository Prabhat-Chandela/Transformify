import React from 'react'

function VideoUpload() {
  return (
    <section className="container p-2 sm:p-4 max-w-7xl grid lg:grid-cols-12 lg:gap-4 ">

      <div className="card bg-base-100 shadow-md lg:col-span-8">
        <div className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose a video file</span>
            </label>
            <input
              type="file" className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Add a video title</span>
            </label>
            <input type="text" placeholder="Title" className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Add a video Description</span>
            </label>
            <textarea className="textarea textarea-bordered" placeholder="Description"></textarea>
          </div>

        </div>
      </div>




    </section>
  )
}

export default VideoUpload