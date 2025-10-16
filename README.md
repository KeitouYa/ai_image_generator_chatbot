# AI Image Generator & Chatbot — Full-Stack SaaS Platform

Tech Stack: React · Next.js 15 · TypeScript · Gemini AI · Replicate AI · MongoDB · Cloudinary · Clerk Auth · PayPal · Shadcn UI · Tailwind CSS
Deployed on: Vercel

## Overview

This project is a full-stack AI SaaS application that allows users to:

Generate high-quality AI images from text prompts.

Chat with an intelligent AI chatbot powered by Google Gemini AI.

Manage, preview, and download generated images from a personalized dashboard.

Purchase credits via PayPal to generate more images securely.

The app integrates Gemini AI and Replicate AI APIs for content generation, providing both creative and conversational AI features within a modern SaaS architecture.

This project was inspired by the Udemy course
AI SaaS Image Generator & Chatbot with React, Next.js & TypeScript

## Features

✅ Text-to-Image Generation (Gemini AI + Replicate AI)
✅ Real-time Chatbot Integration
✅ Clerk Authentication (Sign up, Login, Dashboard access)
✅ PayPal Credit-based Billing System
✅ Cloudinary-powered Media Management
✅ Responsive UI with Shadcn UI + Tailwind CSS
✅ Dark / Light Theme Support
✅ Deployed on Vercel with Global Accessibility

<img width="783" height="834" alt="image" src="https://github.com/user-attachments/assets/a092c680-25aa-4e10-80ee-fc7d4dcc37f7" />



“Chat Interface Screenshot” 展示 AI 聊天界面

## ⚙️ Tech Stack
Layer	Technologies
Frontend	React, Next.js 15 (App Router), TypeScript, Shadcn UI, Tailwind CSS
Backend	Next.js Server Actions, MongoDB, Mongoose
AI Integration	Google Gemini AI, Replicate AI
Authentication & Payments	Clerk Auth, PayPal SDK
Media Handling	Cloudinary
Deployment	Vercel

📷 （插图建议2）：放一张系统架构图（Architecture Diagram），展示前端、后端、AI、数据库、Cloudinary、PayPal 的交互关系。

## 🛠️ Installation & Setup
# 1️⃣ Clone repository
git clone https://github.com/KeitouYa/ai_image_generator_chatbot.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables (.env)
# Include your keys:
# GEMINI_API_KEY=
# REPLICATE_API_TOKEN=
# MONGODB_URI=
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
# CLERK_SECRET_KEY=
# CLOUDINARY_API_KEY=
# PAYPAL_CLIENT_ID=
# PAYPAL_SECRET=

# 4️⃣ Run locally
npm run dev

# App will run on http://localhost:3000


📷 （插图建议3）：插入一张运行截图（例如本地 http://localhost:3000
 的首页或成功登录画面）

## 🧠 Project Structure
ai_image_generator_chatbot/
├── app/               # Next.js App Router pages & layouts
├── components/        # Reusable UI components (Button, Navbar, Cards)
├── actions/           # Server actions for AI & payment
├── lib/               # Utility functions, config, API setup
├── public/            # Static assets
└── styles/            # Global Tailwind styles

## 💳 Credits & Authentication Flow

1️⃣ New users sign up with Clerk Auth
2️⃣ Each account gets limited free credits
3️⃣ Users can purchase additional credits via PayPal
4️⃣ Credit balance updates automatically in real-time

📷 （插图建议4）：放支付界面或 Clerk 登录界面截图

## 🌐 Deployment

Deployed on Vercel, optimized for SEO and global delivery via server-side rendering.
Environment variables securely managed through Vercel dashboard.

📷 （插图建议5）：可放一张线上网站截图（Vercel 部署成功界面或生产环境URL展示图）

## 🧑‍💻 Author

Wu Minghui (Daniel Wu)
📍 Northeastern University — MS in Information Systems
💼 LinkedIn
 | Portfolio
 | GitHub
