"use server";

import prisma from "@/lib/db";

export const isShortLinksExists = async (shortLinks: string) => {
  try {
    const result = await prisma.urls.findUnique({
      where: {
        short_url: shortLinks,
      },
    });

    if (result === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
