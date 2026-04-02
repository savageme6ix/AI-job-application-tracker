import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import ResumeCard from "~/Components/ResumeCard";
import {resumes} from "../../constants";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  //if user is in the home page and isnt authenticated
  //send them to the login page and the back aftr
  const auth = usePuterStore((state) => state.auth);
  const isLoading = usePuterStore((state)=> state.isLoading);
  const navigate = useNavigate();

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
        <h2>Review your submissions and check AI-powered feedback</h2>
      </div>
    

    {resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume)=>(
           <ResumeCard key={resume.id} resume={resume}/>
         ))}
      </div>
    )}
    
    </section>
    
  </main>;
}
