import { Link, useNavigate, useParams } from "react-router";
import type { Route } from "./+types/Resume";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { resumeAndPrerender } from "react-dom/static";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Review" },
    { name: "description", content: "Detailed overview of your resume" },
  ];
}

const Resume = () => {
  const {auth,isLoading,fs,kv} = usePuterStore();
  const { id } = useParams();
  const [imageUrl,setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const loadResume = async()=>{
    const resume = await kv.get(`resume:${id}`);

      if(!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
      const resumeURL = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeURL);

      const imageBlob = await fs.read(data.imagePath);
      if(!imageBlob) return;
      const imageURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageURL);

      setFeedback(data.feedback)
    }
    loadResume();
  },[id])

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
            <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
            <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
      <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover min-h-screen sticky top-0 flex items-center justify-center">
        {imageUrl && resumeUrl && (
        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              className="w-full h-full object-contain rounded-2xl"
              title="resume"
            />
          </a>
        </div>
      )}
  </section>

      </div>
    </main>
  )
}

export default Resume