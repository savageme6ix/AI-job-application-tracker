import Navbar from "~/Components/Navbar";
import{useState} from 'react';

const Upload = () => {
    const[isProcessing,setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');

  return (
  <main className="bg-[url('/images/bg-main.svg')] bg-cover">

    <Navbar />

    <section className="main-section">
        <div className='page-heading'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                 <h2>{statusText}</h2>
                 <img 
                    src="images/resume-scan.gif"
                    className="w-full"
                 />
                </>
            ): (
                <h2>Drop your resume for an ATS score and improvment tips</h2>
            )}
            {!isProcessing && (
                <form id="upload-form" onSubmit={handleSubmit}>

                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default Upload