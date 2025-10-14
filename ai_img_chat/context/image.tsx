//context/image.tsx
"use client";
import { generateImageAi } from "@/actions/image";
import { checkCreditRecordDb, getUserCreditsFromDb } from "@/actions/credit";
import { set } from "mongoose";
import React from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

//context type
interface ImageType {
  imageUrl: string;
}

//context value type
interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (query: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  generateImage: () => void;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  getUserCredits: () => void;
}

//create context
export const ImageContext = React.createContext<ImageContextType | undefined>(
  undefined
);

//context provider component
export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  //state to hold image data
  const [imagePrompt, setImagePrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [credits, setCredits] = React.useState(0);

  const { isSignedIn } = useUser();
  //hooks
  const router = useRouter();

  React.useEffect(() => {
    getUserCredits();
  }, []);

  React.useEffect(() => {
    checkCreditRecordDb();
  }, []);

  const getUserCredits = async () => {
    // try {
    //   const { credits } = await getUserCreditsFromDb();
    //   setCredits(credits.credits);
    // } catch (err) {
    //   toast.error("Failed to get user credits");
    // }
    getUserCreditsFromDb().then((credit) => setCredits(credit?.credits));
  };

  //function to generate image
  const generateImage = async () => {
    setLoading(true);
    if (!isSignedIn) {
      toast.loading("Please sign in to generate images");
    }
    try {
      //generate image with ai
      const { success, _id, credits } = await generateImageAi(imagePrompt);
      if (success) {
        setCredits(credits);
        toast.success("🎉Image generated");
        router.push(`/dashboard/image/${_id}`);
      } else {
        setCredits(credits);
        toast.error(
          "Insufficient credits. Please by more credits to generate images."
        );
        router.push("/buy-credits");
      }
    } catch (err: any) {
      if (err?.digest === "NEXT_REDIRECT") throw err; // 放行，让浏览器跳转到托管登录页
    }
  };

  return (
    <ImageContext.Provider
      value={{
        imagePrompt,
        setImagePrompt,
        loading,
        setLoading,
        generateImage,
        credits,
        setCredits,
        getUserCredits,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

//export useImage hook to use the context
export const useImage = (): ImageContextType => {
  //use the context
  const context = React.useContext(ImageContext);
  //throw error if context is undefined
  if (context === undefined) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
