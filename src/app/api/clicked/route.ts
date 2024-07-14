import { getUsersCountry } from "@/helper/detection";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(req: Request, res: Response) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // GET SEARCH PARAMS INFO
  const { searchParams } = new URL(req.url);
  const shortUrl = searchParams.get("shortUrl")?.toString();
  const device = searchParams.get("device")?.toString();

  if (!shortUrl && !device) {
    return Response.json({ error: "Invalid URL Params" }, { status: 400 });
  }

  console.log("@@device", device);

  // find the url based on the shortUrl
  const url = await prisma.urls.findUnique({
    where: {
      short_url: shortUrl,
      userId: user.id,
    },
  });

  if (!url) {
    return Response.json({ error: "URL not found" }, { status: 404 });
  }

  try {
    // DLOCATION DETECT
    const country = await getUsersCountry();

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
        urlsId: url?.id,
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
          urlsId: url?.id,
          userId: user.id,
          day,
          month,
          year,
        },
      },
      create: {
        userId: user.id,
        urlsId: url?.id,
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
        id: url?.id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    await prisma.$transaction([deviceUpdate, countryUpdate, urlsUpdate]);

    return Response.json(url?.original_url);
  } catch (error: any) {
    console.log(error.message);
  }
}
