import { usePuterStore } from '~/lib/puter';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps{
  onFileSelect ? : (file: File | null) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const FileUploader = ({onFileSelect} : FileUploaderProps) => {
   const fs = usePuterStore((state) => state.fs);
    
  // 1. Move the hook logic directly into the main component
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect ?. (file)
    // Do something with the files
    if(file){

    try {
        const path = '/resumes';
        await fs.mkdir(path, { recursive: true });
        const res = await fs.upload(acceptedFiles, path);
        console.log(res)

      } catch (error: any) {
        console.error("Error", error.message);
      }
    }
  }, [onFileSelect,fs]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }, // Best practice: Only allow PDFs 
    multiple: false, // only  one resume at a time
    maxSize: MAX_FILE_SIZE,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border p-4 cursor-pointer">
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='space-y-4 cursor-pointer'>
          
          {file ?(
            <div className='uploader-selected-file' onClick={(e)=>e.stopPropagation()}>
              <img src="/images/pdf.png" alt="pdf" className='size-10'/>
              <div className='flex items-center space-x-3'>
              <div>
                  <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>
                    {file.name}
                 </p>
                  <p className='text-sm text-gray-500'>
                   {formatSize(file.size)}
                 </p>
              </div>
              </div>
              <button className='p-2 cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                onFileSelect?.(null)
              }}
              >
                <img src="/icons/cross.svg" alt='remove' className='w-4 h-4'/>
              </button>
            </div> 
          ):(
            <div>
              <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                <img src='/icons/info.svg' alt='upload' className='size-20'/>
             </div>
              <p className='text-lg text-gray-500'>
                <span className='font-semi-bold'>
                  Click to upload
                </span> or drag and drop
              </p>
              <p className='text-lg text-gray-500'>
                  PDF (max {formatSize(MAX_FILE_SIZE)})
              </p>
            </div>
          )}
      </div>
    </div>
    </div>
  );
};

export default FileUploader;