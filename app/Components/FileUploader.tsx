import { usePuterStore } from '~/lib/puter';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
   const fs = usePuterStore((state) => state.fs);
    
  // 1. Move the hook logic directly into the main component
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // Do something with the files
    try {
    
        const path = './Resumind';
        if (!fs) throw new Error("File system not initialized!");

        await fs.mkdir(path, { recursive: true });
      const res = await fs.upload(acceptedFiles);
      console.log(res)
        
      } catch (error: any) {
        console.error("Error", error.message);
      }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }, // Best practice: Only allow PDFs 
    multiple: false // only  one resume at a time
  });

  return (
    <div className="w-full gradient-border p-4 cursor-pointer">
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='spac-y-4 cursor-pointer'>
          <div className='mx-auto w-16 h-16 flex items-center justify-center'>
            <img src='/icons/info.svg' alt='upload' className='size-20'/>
          </div>
      </div>
    </div>
    </div>
  );
};

export default FileUploader;