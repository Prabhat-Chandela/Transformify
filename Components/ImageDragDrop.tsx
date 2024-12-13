import React, { useState } from 'react';
import { ImagePlus, Image, CircleX } from 'lucide-react';

interface ImageDropComponentProps {
    handleFileUpload: (file: File) => void;
    handleReset: (acceptanceStatus: boolean) => void;
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
        <section className={`max-w-[525px] sm:max-w-full p-2 lg:p-4 bg-base-100 grid gap-2 lg:gap-4 sm:grid-cols-12`}>
            {
                isAcceptingFile && !droppedImage ? (
                    <div onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className='sm:col-span-6 bg-white rounded-md p-4 aspect-video min-[976px]:aspect-[16/7] flex flex-col justify-between'>
                            <div className='w-full h-[40%] sm:h-[50%] px-2 grid place-items-center'>
                                <p className='text-base-200 text-lg mb-2'>Drag & Drop Your Image For Transformation Here.</p>
                            </div>
                            <div className='divider divider-primary mt-0 mb-0 text-base-200'>OR</div>
                        <div className="form-control">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered file-input-primary w-full"
                            />
                        </div>
                    </div>
                ) : (
                    <div className='sm:col-span-6 bg-white rounded-md p-4 aspect-video min-[976px]:aspect-[16/7] flex flex-col items-start justify-between'>
                        <div>
                            <div className='text-base-100 text-lg lg:text-xl uppercase flex items-center gap-2 font-medium'><span className='inline-flex'><Image /></span> Original Image : </div>
                            <p className="mb-4 mt-2 text-sm sm:text-lg font-medium text-primary">
                                {droppedImage?.name}
                            </p>
                        </div>

                        <button
                            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-base-100 text-primary-content hover:text-base-100 hover:bg-secondary-content rounded-md flex items-center gap-2 transition-all ease-in duration-200"
                            onClick={resetFile}
                        >
                            <span><CircleX /></span> Cancel
                        </button>
                    </div>
                )
            }

            {
                isAcceptingFile && !droppedImage ? (
                    <div className='sm:col-span-6 rounded-md overflow-hidden aspect-video min-[976px]:aspect-[16/7] border border-white'>

                    </div>
                ) : (
                    <div className='sm:col-span-6 rounded-md overflow-hidden aspect-video min-[976px]:aspect-[16/7] border border-white'>
                        {
                            droppedImage && <img className='w-full object-cover' src={URL.createObjectURL(droppedImage)} alt='uploadedImagePreview' />
                        }
                    </div>
                )
            }

            {error && <p className="mt-2 w-full bg-primary-content text-base-200 p-2">{error}</p>}

        </section>
    )
}

export default ImageDragDrop