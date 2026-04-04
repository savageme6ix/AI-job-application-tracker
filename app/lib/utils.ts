// formats size in bytes to human readable string

export function formatSize(bytes:number): string{
    if(bytes===0) return '0 Bytes';

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    // determine appropriate unit by calculating log
    const i: number = Math.floor(Math.log(bytes)/ Math.log(k));

    // format to 2 dp and round
    return parseFloat((bytes/Math.pow(k,i)).toFixed(2)) + '' + sizes[i]
}

export const generateUUID = ()=> crypto.randomUUID();