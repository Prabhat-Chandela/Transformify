"use client"

import React, { useState, useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';
import ImageDragDrop from '@/Components/ImageDragDrop';


const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

const imageEffects = [
  {
    effect: "Enhance Image",
    nameOnScreen: "AI Image Enhancer"
  },
  {
    effect: "Remove image Background",
    nameOnScreen: "Background Removal"
  },
  {
    effect: "Restore Blurry Image",
    nameOnScreen: "AI Image Restore"
  },
  {
    effect: "Remove Text From Image",
    nameOnScreen: "Black & White Image"
  },
]

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const [enhance, setEnhance] = useState<boolean>(false);
  const [removeBackground, setRemoveBackground] = useState<boolean>(false);
  const [restore, setRestore] = useState<boolean>(false);
  const [blackWhite, setBlackWhite] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [uploadedImage, selectedFormat, enhance, removeBackground, restore, blackWhite])

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("Failed to upload the image");

      const data = await response.json();
      setUploadedImage(data.publicId);

    } catch (error) {
      console.log(error);
      alert("Failed to upload the image");
    } finally {
      setIsUploading(false);
    }
  }

  const handleReset = (acceptanceStatus: boolean)=>{
    if(acceptanceStatus === true){
      setUploadedImage(null);
    }
  }

  const handleImageDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })

  }


  return (
    <section className="container p-2 sm:p-4 xl:px-8 max-w-screen-2xl flex flex-col lg:justify-center gap-4 ">

      <div className='w-full'>
        <ImageDragDrop handleFileUpload={(file) => handleFileUpload(file)} handleReset={(acceptanceStatus) => handleReset(acceptanceStatus)} />
      </div>

      {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}

      <div className="card bg-base-100 shadow-md w-full">
        <div className="card-body">

          

          {uploadedImage && (
            <div className="mt-6">
              <h2 className="card-title mb-4 text-primary">Select Image Format :</h2>
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              {uploadedImage && (
                <div className=' mt-6 lg:hidden'>
                  <h2 className="card-title mb-4 text-primary">Choose Image Effect :</h2>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">

                    {imageEffects.map((imgEffect) => (
                      <div key={imgEffect.effect} className="form-control w-full sm:w-52">
                        <label className="label cursor-pointer">
                          <span className="label-text">{imgEffect.nameOnScreen}
                          </span>
                          <input type="checkbox" className="toggle toggle-primary"
                            checked={
                              imgEffect.effect === "Enhance Image" ? enhance :
                                imgEffect.effect === "Remove image Background" ? removeBackground :
                                  imgEffect.effect === "Restore Blurry Image" ? restore :
                                    blackWhite
                            }
                            onChange={(e) =>
                              imgEffect.effect === "Enhance Image"
                                ? setEnhance(e.target.checked)
                                : imgEffect.effect === "Remove image Background"
                                  ? setRemoveBackground(e.target.checked)
                                  : imgEffect.effect === "Restore Blurry Image"
                                    ? setRestore(e.target.checked)
                                    : setBlackWhite(e.target.checked)
                            }
                          />
                        </label>
                      </div>
                    ))}

                  </div>
                  <div className="card-actions justify-start text-xs mt-6 lg:hidden">
                    <button className="btn btn-primary">
                      Apply All Effects
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2 text-primary">Preview :</h3>
                <div className="flex justify-center rounded-lg border border-primary overflow-hidden">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}

                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill_pad"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    fillBackground
                    gravity='auto'
                    removeBackground={removeBackground}
                    enhance={enhance}
                    restore={restore}
                    blackwhite={blackWhite}
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-start text-xs mt-6">
                <button className="btn btn-primary" onClick={handleImageDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='hidden lg:block lg:col-span-4'>
        {uploadedImage && (
          <div className='card bg-base-100 shadow-md'>
            <div className="card-body">
              <div className="flex flex-col">
                {imageEffects.map((imgEffect) => (
                  <div key={imgEffect.effect} className="form-control w-52">
                    <label className="label cursor-pointer">
                      <span className="label-text">{imgEffect.nameOnScreen}
                      </span>
                      <input type="checkbox" className="toggle toggle-primary"
                        checked={
                          imgEffect.effect === "Enhance Image" ? enhance :
                            imgEffect.effect === "Remove image Background" ? removeBackground :
                              imgEffect.effect === "Restore Blurry Image" ? restore :
                                blackWhite
                        }
                        onChange={(e) =>
                          imgEffect.effect === "Enhance Image"
                            ? setEnhance(e.target.checked)
                            : imgEffect.effect === "Remove image Background"
                              ? setRemoveBackground(e.target.checked)
                              : imgEffect.effect === "Restore Blurry Image"
                                ? setRestore(e.target.checked)
                                : setBlackWhite(e.target.checked)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="card-actions justify-start text-xs mt-6">
                <button className="btn btn-primary">
                  Apply All Effects
                </button>
              </div>

            </div>
          </div>
        )}
      </div>


    </section>
  )
}
