"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UAParser from "ua-parser-js";

const parser = new UAParser();

export const storeClick = async (shortUrl: string) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const urls = await prisma.urls.findUnique({
    where: {
      short_url: shortUrl,
      userId: user.id,
    },
  });

  if (!urls) {
    throw new Error("URL not found");
  }

  try {
    const response = await fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=b921c07e5869442398bf44c1018135dc",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const country = data.country_name;
    console.log(country);
    const res = parser.getResult();
    const device = res.device.type || "desktop";

    // GET TIME INFO
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const day = new Date().getUTCDate();

    const deviceUpdate = prisma.deviceHistory.upsert({
      where: {
        userId_day_month_year: {
          userId: user.id,
          day,
          month,
          year,
        },
      },
      create: {
        userId: user.id,
        day,
        month,
        year,
        desktop: device === "desktop" ? 1 : 0,
        mobile: device === "mobile" ? 1 : 0,
        urlsId: urls?.id,
      },
      update: {
        desktop: {
          increment: device === "desktop" ? 1 : 0,
        },
        mobile: {
          increment: device === "mobile" ? 1 : 0,
        },
      },
    });

    const countryUpdate = prisma.countryHistory.upsert({
      where: {
        country_urlsId_userId_day_month_year: {
          country,
          urlsId: urls?.id,
          userId: user.id,
          day,
          month,
          year,
        },
      },
      create: {
        userId: user.id,
        urlsId: urls?.id,
        day,
        month,
        year,
        country,
        clicks: 1,
      },
      update: {
        clicks: {
          increment: 1,
        },
      },
    });

    const urlsUpdate = prisma.urls.update({
      where: {
        id: urls?.id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    const result = await prisma.$transaction([
      deviceUpdate,
      countryUpdate,
      urlsUpdate,
    ]);

    return urls?.original_url;
  } catch (error: any) {
    console.log(error.message);
  }
};
