import { ImageRecipeDescription } from '@/lib/types';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
const [data, setData] = React.useState<ImageRecipeDescription | null>(null);
const onDrop = useCallback(async (acceptedFiles: any[]) => {
    if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        console.log("🚀 ~ onDrop ~ file:", file)

        try {
            // Convert file to Uint8Array
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            const response = await fetch('/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageData: Array.from(uint8Array), // Convert to regular array for JSON serialization
                    mimeType: file.type,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("🚀 ~ onDrop ~ data:", data)
                setData(data);
                
            } else {
                console.error("🚀 ~ Failed to upload file");
            }
        } catch (error) {
            console.error("🚀 ~ Error uploading file:", error);
        }
    }
}, []);
  const {
    getRootProps, 
    getInputProps, 
    isDragActive
} = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        },
})

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Drag and Drop File Upload</h1>
        <p className="mb-4">Upload an image file by dragging and dropping it here or clicking to select a file.</p>
        <div {...getRootProps()} className='border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer mb-4'>
        <input {...getInputProps()} />
        {isDragActive ? (
            <p className="text-center text-gray-500">Drop the file here ...</p>
        ) : (
            <p className="text-center text-gray-500">Drag and drop your file here, or click to select a file</p>
        )}
        </div>


        <div>
            <p className="text-[10px]">Drag and drop an image file here, or click to select a file.</p>
            <p className="text-[10px]">Only one image file is allowed.</p>
            <p className="text-[10px]">Supported formats: PNG, JPG, JPEG, GIF.</p>
            <p className="text-[10px]">File size limit: 5MB.</p>
        </div>
        <div className="mt-4">
            <p className="text-sm text-gray-500">Description of recipe</p>
            <p><span className="font-bold">Amount:</span> <span>{data?.amount}</span></p>
            <p><span className="font-bold">Currency:</span> <span>{data?.currency}</span></p>
            <p><span className="font-bold">Price:</span> <span>{data?.price}</span></p>
            <p><span className="font-bold">Description:</span> <span>{data?.description}</span></p>
            <p><span className="font-bold">Type:</span> <span>{data?.type}</span></p>
        </div>
    </div>
  )
}

export default MyDropzone