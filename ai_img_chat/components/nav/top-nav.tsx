import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { LogIn, LaptopMinimal } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { currentUser } from "@clerk/nextjs/server";
import ModeToggle from "./mode-toggle";

export default async function TopNav() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-center p-5 shadow space-x-10">
      <Toaster />
      <div className="text-2x1 font-bold">
        <Link href="/">
          <Image
            src="/logos/logo.svg"
            alt="ai image generator logo"
            width={50}
            height={50}
          />
        </Link>
      </div>

      {user && (
        <Link href="/dashboard">
          <LaptopMinimal className="h-16 w-16 text-[#6a5acd]"></LaptopMinimal>
        </Link>
      )}

      <div className="flex flex-col items-center gap-3">
        <SignedOut>
          <SignInButton>
            <LogIn className="h-10 w-10 text-[#6a5acd] cursor-pointer"></LogIn>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div className="flex">
        <ModeToggle />
      </div>
    </div>
  );
}
