"use server";

import Credit from "@/models/credits";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveCreditToDb = async (amount: number, credits: number) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    //check if the user already has a credit record
    const existingCredit = await Credit.findOne({ userEmail });

    if (existingCredit) {
      //add to the existing credit
      existingCredit.amount += amount;
      existingCredit.credits += credits;
      await existingCredit.save();
      return JSON.parse(JSON.stringify(existingCredit));
    } else {
      //create a new one
      const newCredit = await new Credit({
        userEmail,
        amount,
        credits,
      });

      await newCredit.save();

      return JSON.parse(JSON.stringify(newCredit));
    }

    const credit = await Credit.findOne;
  } catch (error) {
    console.log("🔴SAVE CREDIT TO DB ERR => ", error);
  }
};

export const getUserCreditsFromDb = async () => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const credit = await Credit.findOne({ userEmail });
    return JSON.parse(JSON.stringify(credit));
  } catch (error) {
    console.log("🔴GET USER CREDITS ERR =>", error);
  }
};

export const checkCreditRecordDb = async () => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const credit = await Credit.findOne({ userEmail });

    if (!credit) {
      const newCredit = await new Credit({
        userEmail,
        amount: 0,
        credits: 5,
      });
      await newCredit.save();
    }
  } catch (err: any) {
    console.log("🔴 CHECK CREDIT RECORD ERR => ", err);
    throw new Error(err);
  }
};
