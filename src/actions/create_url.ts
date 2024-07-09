"use server";

import prisma from "@/lib/db";
import { generateRandomUrl } from "@/lib/random-text";
import { createUrlSchema, createUrlSchemaType } from "@/schema/url";
import { auth } from "@clerk/nextjs/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createShortlinkAction = async (data: createUrlSchemaType) => {
  const parsedBody = createUrlSchema.safeParse(data);

  const user = auth();

  if (!user) {
    return {
      error: "You must be logged in to create a shortlink",
    };
  }

  if (parsedBody.error) {
    return {
      error: parsedBody.error.message,
    };
  }

  let shortlink = parsedBody.data.short_url;

  if (!shortlink) {
    shortlink = generateRandomUrl();
  }

  try {
    await prisma.urls.create({
      data: {
        userId: user.userId as string,
        original_url: parsedBody.data.original_url,
        short_url: shortlink,
        name: parsedBody.data.name || null,
      },
    });
    return {
      success: "Shortlink created successfully 🎉",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.message.includes("Unique constraint failed on the constraint")
      ) {
        return {
          error: "Shortlink already exists. Please try another one.",
        };
      }
    }

    return {
      error:
        "Something went wrong while creating the shortlink. Please try again.",
    };
  }
};
