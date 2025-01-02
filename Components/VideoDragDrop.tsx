import React,{useState} from 'react';
import {CircleMinus} from 'lucide-react';

const VideoDragDrop: React.FC = () => {
const [error, setError] = useState<string>("");

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setError("");

        const draggedFile = event.dataTransfer.files[0];

        if(!draggedFile) return;

        if(!draggedFile.type.startsWith("video/")) {
            setError("Please drop a valid image file.");
            return;
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        setError("");

        if(!uploadedFile) return;

        if(!uploadedFile.type.startsWith("video/")){
            setError("Please select a valid image file.");
            return;
        }
    }

    return (
        <div className='w-full aspect-[16/10] sm:aspect-[16/6] p-4 bg-base-200 rounded-md flex flex-col justify-between relative'>

            <div onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`w-full h-[90%] bg-dragDropBackground rounded-md p-4 flex flex-col items-center justify-center gap-2 sm:gap-4 overflow-hidden`}>

                <div className='max-w-screen-sm p-2 rounded-md flex items-center justify-center gap-4 border-dotted border '>

                    <p className='text-white text-xl text-center sm:text-3xl uppercase font-bold drop-shadow-md'>Drag & Drop Your Video .</p>
                </div>
            </div>
            <div className='divider mt-0 mb-0 '>OR</div>

            <div className="form-control">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered rounded-md"
                />
            </div>


            {error &&<div className='absolute top-0  left-0 rounded-md w-full bg-warning flex justify-between p-2'>
                <p className="text-base-100 p-2 flex items-center gap-2 font-semibold"><span className='inline-flex'
            ><CircleMinus /></span>{error}</p>
            <button onClick={()=> setError("")} className='bg-black px-2 rounded-md font-semibold'>OK</button>
            </div> }

        </div>
    )
}

export default VideoDragDrop;