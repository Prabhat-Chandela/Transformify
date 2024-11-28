import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface ImageDropComponentProps {
    handleFileUpload: (file: File) => void;
}

const ImageDragDrop: React.FC<ImageDropComponentProps> = ({ handleFileUpload }) => {
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
        setError("");
    };

    return (
        <section
            className="w-full p-2 sm:p-4 bg-base-100 rounded-lg h-72"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className={`w-full h-full border border-dashed ${!isAcceptingFile ? 'border-base-content' : 'border-primary'} rounded-md p-2 grid place-items-center`}>
                {droppedImage ? (
                    <div className="flex flex-col items-center">

                        <div className='max-w-72 bg-base-content rounded-lg p-4'>
                            <p className="mb-4 text-sm font-medium text-base-100">
                                {droppedImage?.name}
                            </p>
                        </div>


                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={resetFile}
                        >
                            Remove
                        </button>
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