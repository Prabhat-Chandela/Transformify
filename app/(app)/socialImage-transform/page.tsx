"use client"

import React, { useState, useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';
import ImageDragDrop from '@/Components/ImageDragDrop';
import { ImageUp, ScanEye, ImageOff, Image, SquareLibrary, Sparkles, CircleArrowDown } from 'lucide-react';


const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

const socialFilters = {
  "Filter None": { filter: "" },
  "Filter dente": { filter: "al_dente" },
  "Filter athena": { filter: "athena" },
  "Filter audrey": { filter: "audrey" },
  "Filter aurora": { filter: "aurora" },
  "Filter eucalyptus": { filter: "eucalyptus" },
  "Filter frost": { filter: "frost" },
  "Filter hairspray": { filter: "hairspray" },
  "Filter incognito": { filter: "incognito" }
}

const imageEffects = [
  {
    effect: "AI Enhance Image",
    nameOnScreen: "Enhance",
    icon: <ImageUp />
  },
  {
    effect: "Remove image Background",
    nameOnScreen: "Remove BG",
    icon: <ImageOff />
  },
  {
    effect: "AI Restore Blurry Image",
    nameOnScreen: "Restore",
    icon: <ScanEye />
  },
  {
    effect: "Remove Text From Image",
    nameOnScreen: "Black & White",
    icon: <Image />
  },
]

type SocialFormat = keyof typeof socialFormats;
type SocialFilter = keyof typeof socialFilters;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [selectedFilter, setSelectedFilter] = useState<SocialFilter>("Filter None")
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const [enhance, setEnhance] = useState<boolean>(false);
  const [removeBackground, setRemoveBackground] = useState<boolean>(false);
  const [restore, setRestore] = useState<boolean>(false);
  const [blackWhite, setBlackWhite] = useState<boolean>(false);
  const [fillBackground, setFillBackground] = useState<boolean>(true);
  const [crop, setCrop] = useState<"fill_pad" | "fit">('fill_pad')
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [uploadedImage, selectedFormat, selectedFilter, enhance, removeBackground, restore, blackWhite])

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

  const handleReset = (acceptanceStatus: boolean) => {
    if (acceptanceStatus === true) {
      setUploadedImage(null);
    }
  }

  const handleRemoveBg = () => {
    setRemoveBackground(!removeBackground);
    setFillBackground(!fillBackground);
    if (crop === "fill_pad") {
      setCrop("fit");
    } else {
      setCrop("fill_pad");
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
    <main className="container max-w-screen-lg grid gap-2 lg:gap-6 p-2">

      {isUploading ? (
        <section className='w-full aspect-[8/10] sm:aspect-[16/8] overflow-hidden p-2'>
          <div className="skeleton h-full w-full rounded-md"></div>
        </section>
      ) :
        (
          <section className='w-full h-fit overflow-hidden' >
            {uploadedImage ?
              (<div className='w-full p-4 overflow-hidden'>

                <div className="card w-full bg-base-200 rounded-md">

                  <div className="card-body shadow-md rounded-md">

                    <div className="relative">
                      <div className="flex justify-center rounded-lg overflow-hidden">
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
                          crop={crop}
                          aspectRatio={socialFormats[selectedFormat].aspectRatio}
                          fillBackground={fillBackground}
                          gravity='auto'
                          removeBackground={removeBackground}
                          enhance={enhance}
                          restore={restore}
                          blackwhite={blackWhite}
                          art={socialFilters[selectedFilter].filter}
                          ref={imageRef}
                          onLoad={() => setIsTransforming(false)}
                        />
                      </div>
                    </div>

                  </div>

                </div>


              </div>) :

              (<ImageDragDrop handleFileUpload={(file) => handleFileUpload(file)} handleReset={(acceptanceStatus) => handleReset(acceptanceStatus)} />)
            }
          </section>
        )}


      {uploadedImage && (

        <section className='w-full p-4 grid sm:grid-cols-12 gap-4'>

          <div className="form-control bg-base-200 rounded-md p-2 flex flex-col gap-2 sm:col-span-6">
            <h4 className="text-sm font-medium text-white uppercase flex items-center gap-2"><span><SquareLibrary /></span>Select Image Format :</h4>
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

          <div className="form-control bg-base-200 rounded-md p-2 flex flex-col gap-2 sm:col-span-6">
            <h4 className="text-sm font-medium text-white uppercase flex items-center gap-2"><span><Sparkles /></span>Select Image Filter :</h4>
            <select
              className="select select-bordered w-full"
              value={selectedFilter}
              onChange={(e) =>
                setSelectedFilter(e.target.value as SocialFilter)
              }
            >
              {Object.keys(socialFilters).map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-4 gap-4 sm:col-span-6 '>

            {imageEffects.map((imgEffect) => {

              const isActive =
                (imgEffect.effect === "AI Enhance Image" && enhance) ||
                (imgEffect.effect === "Remove image Background" && removeBackground) ||
                (imgEffect.effect === "AI Restore Blurry Image" && restore) ||
                (imgEffect.effect === "Remove Text From Image" && blackWhite);


              return (
                <div key={imgEffect.effect} className={`form-control col-span-1 p-1 rounded-lg shadow-lg bg-base-200 ${isActive ? 'text-warning' : 'text-white'} hover:text-warning aspect-square transition-all ease-in duration-200`}>

                  <button className="flex bg-base-100 rounded-md flex-col lg:gap-4 items-center justify-center w-full h-full"

                    onClick={() =>
                      imgEffect.effect === "AI Enhance Image"
                        ? setEnhance(!enhance)
                        : imgEffect.effect === "Remove image Background"
                          ? handleRemoveBg()
                          : imgEffect.effect === "AI Restore Blurry Image"
                            ? setRestore(!restore)
                            : setBlackWhite(!blackWhite)
                    }
                  >{imgEffect.icon} <span className='hidden lg:inline-flex text-xs'>{imgEffect.nameOnScreen}</span></button>

                </div>
              )
            })}
          </div>

          <div className='sm:col-span-6 bg-base-200 rounded-md p-2'>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Want to change backgroundColor?</span>
                  <span className="label-text-alt text-white">Type below</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </label>

          </div>


          <div className='sm:col-span-12 bg-base-200 rounded-md p-2'>

          <input
  type="text"
  placeholder="Type here"
  className="input input-bordered input-lg w-full" />

          </div>

          <button className="sm:col-span-6 flex items-center gap-2 p-4 w-fit rounded-lg text-base-100 bg-white shadow-md text-xs font-semibold sm:text-sm hover:bg-warning transition-all ease-in duration-200" onClick={handleImageDownload}>
            <span><CircleArrowDown /></span> Download for {selectedFormat}
          </button>

        </section>
      )}


    </main>
  )
}
