import { getUsersCountry, isMobileDevice } from "@/helper/detection";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Redirect from "./_component/redirect";

const Page = async ({ params }: { params: { link: string } }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const url = await prisma.urls.findUnique({
    where: {
      userId: user.id,
      short_url: params.link,
    },
  });

  if (!url) {
    throw new Error("URL not found");
  }

  // DEVICE & LOCATION DETECT
  let device;
  if (isMobileDevice()) {
    device = "mobile";
  } else {
    device = "desktop";
  }
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

  return (
    <div className="container h-[calc(100vh-80px)] flex justify-center items-center">
      <Redirect url={url.original_url} />
    </div>
  );
};

export default Page;
