import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import ResumeCard from "~/Components/ResumeCard";

import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

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

  useEffect(()=>{
    if(!isLoading && !auth.isAuthenticated) navigate('/auth?next=/')
  },[auth.isAuthenticated, navigate, isLoading]);

 
  
  if(isLoading){
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Applications & Resume Rating</h1>
        {!loadingResumes && resumes?.length === 0 ? (
             <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ) :(
           <h2>Review your submissions and check AI-powered feedback</h2>
        )}
      </div>
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}

    {!isLoadingResumes && resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume)=>(
           <ResumeCard key={resume.id} resume={resume}/>
         ))}
      </div>
    )}
      {!isLoadingResumes && resumes?.length === && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to='/upload' className="primary-button w-fit text-xl font-semibold">
          Upload Resume
         </Link>
        </div>
      )}
    </section>
    
  </main>;
}
