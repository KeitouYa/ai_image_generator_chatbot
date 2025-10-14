"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import Image from "@/models/image";
import Credit from "@/models/credits";
import Credits from "@/components/nav/credits";

const replicate = new Replicate({
  //get your token from https://replicate.com/account
  auth: process.env.REPLICATE_API_TOKEN,
});

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function generateImageAi(imagePrompt: string) {
  //to redirect if not authenticated
  const { isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    // 跳转到 Clerk 托管登录页，登录成功后回到根目录
    return redirectToSignIn({ returnBackUrl: "/" });
  }

  //get current user
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userName = user?.fullName;

  try {
    //connect to db
    await db();

    //1.check if user has enough credits
    const userCredit = await Credit.findOne({ userEmail });
    if (!userCredit || userCredit.credits < 1) {
      return {
        success: false,
        _id: null,
        credits: userCredit?.credits,
      };
    }

    //2. reduce the credit by 1
    userCredit.credits -= 1;
    await userCredit.save();

    //generate image logic here
    const input = {
      prompt: imagePrompt,
      output_format: "png",
      output_quality: 80,
      aspect_ratio: "16:9",
    };

    const output: any = await replicate.run("black-forest-labs/flux-schnell", {
      input,
    });

    //convert stream to buffer
    const response = await fetch(output[0]);
    const buffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);

    //upload the buffer to cloudinary
    const uploadResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ai_images",
          public_id: nanoid(),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(nodeBuffer);
    });

    //save image record to db
    const cloudinaryUrl = uploadResponse.secure_url;
    const image = await new Image({
      userEmail,
      userName,
      url: cloudinaryUrl,
      name: imagePrompt,
    }).save();

    return {
      success: true,
      _id: image._id,
      credits: userCredit.credits, //this can be used to update the UI instantly
    };
  } catch (err) {
    throw err instanceof Error ? err : new Error(String(err));
  }
}

//function to get user images from db with pagination
export const getUserImagesFromDb = async (page: number, limit: number) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const [images, totalCount] = await Promise.all([
      Image.find({ userEmail })
        .sort({ createdAt: -1 }) //sorted by createdAt desc
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      Image.countDocuments({ userEmail }).exec(),
    ]);

    return { images: JSON.parse(JSON.stringify(images)), totalCount };
  } catch (err: any) {
    throw new Error(String(err));
  }
};

//make image clickable
export const getImageFromDb = async (_id: string) => {
  try {
    await db();
    const image = await Image.findById(_id);
    return JSON.parse(JSON.stringify(image));
  } catch (err: any) {
    throw new Error(err);
  }
};
