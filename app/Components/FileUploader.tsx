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
      
        if (!fs) throw new Error("File system not initialized!");

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
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    </div>
  );
};

export default FileUploader;