import { Link, useParams } from "react-router";
import type { Route } from "./+types/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Review" },
    { name: "description", content: "Detailed overview of your resume" },
  ];
}

const resume = () => {
  const { id } = useParams();

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
            <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
            <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>
    </main>
  )
}

export default resume