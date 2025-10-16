# AI Image Generator & Chatbot — Full-Stack SaaS Platform

A full-stack AI SaaS application that enables users to **generate AI images from text prompts** and **interact with an intelligent chatbot** powered by **Google Gemini AI** and **Replicate AI**.  
Built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Tailwind CSS**, the app integrates **Clerk Auth** for authentication and **PayPal SDK** for credit-based payments.  
All generated images are managed through **Cloudinary** and deployed on **Vercel** for global accessibility.

---

## Features
- Text-to-Image generation using **Gemini AI** and **Replicate AI**
- AI-powered chatbot for intelligent conversations
- Secure authentication with **Clerk**
- Credit-based payment system via **PayPal**
- Cloud image management using **Cloudinary**
- Responsive UI built with **Shadcn UI + Tailwind CSS**
- Deployed on **Vercel** with SEO optimization

<img width="897" height="876" alt="image" src="https://github.com/user-attachments/assets/9f83da41-a5ff-4117-a859-7aec70bc0ca4" />
<img width="598" height="518" alt="image" src="https://github.com/user-attachments/assets/46c7da3d-2cbd-4b8f-8f85-d5d2af6f5017" />
<img width="1074" height="761" alt="image" src="https://github.com/user-attachments/assets/4adc46f0-c31c-42eb-a39b-e7e19408a2b5" />
<img width="1034" height="902" alt="image" src="https://github.com/user-attachments/assets/9ff27bd8-61c4-4004-a876-78bde344f850" />
<img width="729" height="754" alt="image" src="https://github.com/user-attachments/assets/d27a42b6-3c04-4b11-96af-0c2bd10cb595" />
---

## Tech Stack
| Layer | Technologies |
|:------|:--------------|
| Frontend | React, Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Next.js Server Actions, MongoDB, Mongoose |
| AI Integration | Google Gemini AI, Replicate AI |
| Authentication | Clerk Auth |
| Payments | PayPal SDK |
| Media Handling | Cloudinary |
| Deployment | Vercel |

---

## Getting Started
```bash
# 1️⃣ Clone the repository
git clone https://github.com/YourUsername/ai_image_generator_chatbot.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables (.env)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
MONGODB_URI=
REPLICATE_API_TOKEN=
GEMINI_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# 4️⃣ Run the app locally
npm run dev
