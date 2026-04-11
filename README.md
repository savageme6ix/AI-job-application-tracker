RESUMIND 
AI-Powered Applicant Tracking System

Resumind is a modern web application designed to help job seekers analyze their resumes against job descriptions. Built using React Router v7 and powered by the Puter.js SDK, it leverages AI for scoring, decentralized storage for file management, and a high-performance frontend hosted on Vercel.

🛠 Tech Stack
Frontend: React Router v7 

Styling: Tailwind CSS 

State Management: Zustand

Backend-as-a-Service: Puter.js v2 (Auth, KV Store, and File System)

AI Engine: Puter AI (Claude-3.5-Sonnet integration)

Deployment: Vercel (Production) & Puter Hosting (Static)

✨ Features
AI Resume Scoring: Instant feedback on resume strength and job alignment.

Decentralized Storage: Uses Puter's global file system to store and retrieve PDFs and images.

Persistence: A custom Key-Value (KV) implementation to manage user resume history.

Responsive Design: Optimized for desktop and mobile.

🧩 Architecture
The project follows a Zero-Server architecture. All backend logic (Storage, Database, Auth, and AI) is handled directly through the Puter.js SDK from the client side.

lib/puter.ts: Handles the singleton initialization of the Puter SDK.

store/usePuterStore.ts: A Zustand store that acts as the bridge between the React UI and Puter's cloud services.

routes/resume-details.tsx: Uses useParams and useEffect to hydrate resume data from the KV store and File System via Blob URLs.
Authentication: Secure global login via Puter's identity provider.
