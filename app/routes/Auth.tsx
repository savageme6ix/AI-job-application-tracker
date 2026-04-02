import type { Route } from "./+types/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
  ];
}
const Auth = () => {
  return (
    <div>Auth</div>
  )
}

export default Auth