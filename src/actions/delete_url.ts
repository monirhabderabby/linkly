"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onDeleteAction = async (id: string) => {
  const user = auth();

  if (!user) {
    redirect("/sign-in");
  }
  try {
    await prisma.urls.delete({
      where: {
        id: id,
        userId: user.userId as string,
      },
    });

    return {
      success: "URL deleted successfully 🎉",
    };
  } catch (error) {
    return {
      error: "Something went wrong 😓",
    };
  }
};
