# 🖼️ AI Image Generator & Chatbot — Full-Stack SaaS Platform

A full-stack AI SaaS application that enables users to **generate AI images from text prompts** and **interact with an intelligent chatbot** powered by **Google Gemini AI** and **Replicate AI**.  
Built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Tailwind CSS**, the app integrates **Clerk Auth** for authentication and **PayPal SDK** for credit-based payments.  
All generated images are managed through **Cloudinary** and deployed on **Vercel** for global accessibility.

---

## 🚀 Features
- Text-to-Image generation using **Gemini AI** and **Replicate AI**
- AI-powered chatbot for intelligent conversations
- Secure authentication with **Clerk**
- Credit-based payment system via **PayPal**
- Cloud image management using **Cloudinary**
- Responsive UI built with **Shadcn UI + Tailwind CSS**
- Deployed on **Vercel** with SEO optimization

> 📷 **(插图建议1)**：放一张首页截图  
> 文件名建议：`/assets/homepage.png`  
> 显示输入框 + 生成图片区域  
>  
> 📷 **(插图建议2)**：放一张聊天界面截图  
> 文件名建议：`/assets/chatbot.png`

---

## 🧠 Tech Stack
| Layer | Technologies |
|:------|:--------------|
| Frontend | React, Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Next.js Server Actions, MongoDB, Mongoose |
| AI Integration | Google Gemini AI, Replicate AI |
| Authentication | Clerk Auth |
| Payments | PayPal SDK |
| Media Handling | Cloudinary |
| Deployment | Vercel |

> 📷 **(插图建议3)**：放系统架构图（architecture-diagram.png）  
> 展示前端、后端、AI、Cloudinary、PayPal 的交互关系  
>  
> 例如：
> ![System Architecture](./assets/architecture-diagram.png)

---

## ⚙️ Getting Started
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
