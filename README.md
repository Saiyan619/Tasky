
# 🗂️ Tasky – Collaborative Task Management App

**Tasky** is a full-stack collaborative task management application designed to help individuals and teams organize, assign, and track tasks in an intuitive and personalized way. It includes AI-powered task recommendations tailored to users’ hobbies and time availability.

---

## 🚀 Features

- ✅ Create, update, and delete tasks
- 👥 Assign tasks to team members with role-based access
- 🔍 Filter and sort tasks by status, priority, and due date
- 🤖 AI-powered task suggestions based on user interests and schedule
- 🔐 Secure user authentication and authorization
- ⚡ Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/) *(for animations, if used)*

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)

### Other Tools
- [Gemini API]
- [Clerk](https://clerk.com/) for authentication
- [Postman](https://www.postman.com/) for API testing
- [Cloudinary](https://cloudinary.com/) for media

---

## 📦 Installation

### Prerequisites
- Node.js and npm installed
- MongoDB database (e.g., MongoDB Atlas)
- API keys for any external services (e.g., OpenAI)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tasky.git
cd tasky

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

# For the fullstack setup
npm run dev
/frontend       # Next.js frontend
/backend        # Express backend
/models         # MongoDB models
/routes         # API routes
/utils          # Helper functions
