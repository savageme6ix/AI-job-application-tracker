import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  //if user is in the home page and isnt authenticated
  //send them to the login page and the back aftr
  const {auth,fs} = usePuterStore();
  const isLoading = usePuterStore((state)=> state.isLoading);
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState('')
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [LoadingResumes, setLoadingResumes] = useState(false);
  const { kv } = usePuterStore();

  useEffect(()=>{
    if(!isLoading && !auth.isAuthenticated) navigate('/auth?next=/')
  },[auth.isAuthenticated, navigate, isLoading]);

useEffect(() => {
  const fetchResumes = async () => {
    setLoadingResumes(true);
    try {
      const list = (await kv.list('resume:*', true)) as KVItem[];
      const parsed = list.map(item => JSON.parse(item.value) as Resume);
      console.log(parsed)
      setResumes(parsed);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingResumes(false);
    }
  };
  fetchResumes();
}, [kv]);
  
  if(isLoading){
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Applications & Resume Rating</h1>
        {!LoadingResumes && resumes?.length === 0 ? (
             <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ) :(
           <h2>Review your submissions and check AI-powered feedback</h2>
        )}
      </div>
      {LoadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}

    {!LoadingResumes && resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume)=>(
           <ResumeCard key={resume.id} resume={resume}/>
         ))}
      </div>
    )}
      {!LoadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to='/upload' className="primary-button w-fit text-xl font-semibold">
          Upload Resume
         </Link>
        </div>
      )}
    </section>
    
  </main>;
}
