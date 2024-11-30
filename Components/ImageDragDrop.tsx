import React, { useState } from 'react';
import { ImagePlus, Image, CircleX } from 'lucide-react';

interface ImageDropComponentProps {
    handleFileUpload: (file: File) => void;
    handleReset:(acceptanceStatus: boolean) => void;
}

const ImageDragDrop: React.FC<ImageDropComponentProps> = ({ handleFileUpload, handleReset }) => {
    const [droppedImage, setDroppedImage] = useState<File | null>(null);
    const [isAcceptingFile, setIsAcceptingFile] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setError("");
        const draggedFile = event.dataTransfer.files[0];

        if (!draggedFile) return;

        if (!draggedFile.type.startsWith("image/")) {
            setError("Please drop a valid image file.");
            return;
        }

        if (draggedFile) {
            handleFileUpload(draggedFile);
            setDroppedImage(draggedFile)
            setIsAcceptingFile(false);
        }

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        setError("");

        if (!uploadedFile) return;

        if (!uploadedFile.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (uploadedFile) {
            handleFileUpload(uploadedFile);
            setDroppedImage(uploadedFile)
            setIsAcceptingFile(false);
        }

    };

    const resetFile = () => {
        setDroppedImage(null);
        setIsAcceptingFile(true);
        setError("");
        handleReset(true);
    };

    return (
        <section
            className={`w-full p-2 sm:p-4 bg-base-100 rounded-lg ${!isAcceptingFile ? 'h-fit' : 'h-72'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className={`w-full h-full border border-dashed ${!isAcceptingFile ? 'border-base-content' : 'border-primary'} rounded-md p-2 grid place-items-center`}>
                {droppedImage ? (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 items-center sm:justify-center">

                    <div className='w-[90%] sm:w-[40%] lg:w-[42%] aspect-video sm:aspect-[16/12] lg:aspect-[16/7] rounded-md overflow-hidden border border-primary'>
                    <img className='w-full object-cover' src={URL.createObjectURL(droppedImage)} alt='uploadedImagePreview'/>
                    </div>

                        <div className='p-4 flex flex-col items-start sm:justify-between w-[90%] sm:w-[40%] lg:w-[42%] aspect-video sm:aspect-[16/12] lg:aspect-[16/7] bg-primary rounded-md'>
                            <div>
                            <div className='text-base-100 text-lg lg:text-xl uppercase flex items-center gap-2 font-medium'><span className='inline-flex'><Image /></span> Original Image : </div>
                            <p className="mb-4 mt-2 text-sm sm:text-lg font-medium text-base-100/70">
                            {droppedImage?.name}
                            </p>
                            </div>
                            
                            <button
                            className="px-4 lg:pr-4 py-2 text-xs lg:text-sm bg-base-100 text-primary hover:text-base-content rounded-md flex items-center gap-2"
                            onClick={resetFile}
                        >
                           <span><CircleX /></span> Cancel
                        </button>
                        </div>
                       
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className='max-w-64 sm:max-w-2xl text-center bg-primary text-base-100 flex flex-col gap-2 p-4 rounded-lg'>
                            <div className='w-full grid place-content-center'><ImagePlus /></div>
                            <p className="mb-2 text-sm">
                                Drag & drop an image here
                            </p>
                        </div>
                        <div className="divider before:bg-base-content before:h-[1px] after:bg-base-content  after:h-[1px] text-primary text-xs">OR</div>
                        <div className="form-control">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered file-input-primary max-w-64 sm:max-w-2xl"
                            />
                        </div>
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ImageDragDrop