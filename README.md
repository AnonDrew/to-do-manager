# 📝 To-do Manager

A full-stack to-do list application that allows users to add, update, and delete tasks with persistent storage.

---

## 🔧 Technologies Used

- **Frontend**: Vite + React + TypeScript, hosted on Vercel
- **Backend**: Express.js (Node.js), hosted on Railway
- **Database**: PostgreSQL, hosted on Vercel + Neon
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com)
  - Backend: [Railway](https://railway.app)
  - Database: Neon
- **Containerization**: Docker (for local development)
- **Language**: TypeScript (for both frontend and backend)

---

## 🚀 Live Demo

🔗 [https://to-do-manager-zeta.vercel.app](https://to-do-manager-zeta.vercel.app)

---

## 🛠 Installation & Setup Instructions (Local Dev)
Almost all the development environment setup is in the Docker related files:

Docker Compose is necessary

Clone repo

View comments in vite.config.ts & App.tsx

docker compose up --build in root directory (where all Docker files are)

If any issues and need to rerun, clear Docker cache before running again

## 💡 Notes & What I Learned

Gained hands-on experience with full-stack application deployment.
	
  •	Learned how to:
	
  •	Use Vite proxying in dev and env-based API switching in production
	
  •	Deploy backend and frontend separately on Railway and Vercel
	
  •	Used ChatGPT as a coding assistant for:
	
  •	Debugging Docker errors
	
  •	Generating config templates
	
  •	Clarifying Vite and Express setup
  
  •	All CSS styling (I suck at it and it takes too long)

  •	(VSCode Free Copilot thing?) Most of the commit messages to reduce the overhead tedium of using git properly
	
  •	Writing this README 😄

The main new thing for me in this project was the deployment side of things, which was surprisingly straight forward thanks to the available services.
I originally planned on using Docker for manual deployment, but I was short on time so I only leveraged it for local dev.
Hopefully it makes reproducing my environment straight forward too.