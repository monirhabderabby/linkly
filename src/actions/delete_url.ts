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
    const deleteUrls = prisma.urls.delete({
      where: {
        id: id,
        userId: user.userId as string,
      },
    });

    const deleteDeviceHistory = prisma.deviceHistory.deleteMany({
      where: {
        urlsId: id,
        userId: user.userId as string,
      },
    });

    const deleteCountryHistory = prisma.countryHistory.deleteMany({
      where: {
        urlsId: id,
        userId: user.userId as string,
      },
    });

    await prisma.$transaction([
      deleteUrls,
      deleteDeviceHistory,
      deleteCountryHistory,
    ]);

    return {
      success: "URL deleted successfully 🎉",
    };
  } catch (error) {
    return {
      error: "Something went wrong 😓",
    };
  }
};
