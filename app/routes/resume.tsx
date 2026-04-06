import { useParams } from "react-router";
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
    
    <div>
      Resume {id}
    </div>
  )
}

export default resume