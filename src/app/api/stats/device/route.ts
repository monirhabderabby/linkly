import prisma from "@/lib/db";
import { statsQuerySchema } from "@/schema/stats";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request, res: Response) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const id = searchParams.get("id");

  const queryParams = statsQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return Response.json(queryParams.error.message, {
      status: 400,
    });
  }

  if (!from || !to) {
    return Response.json(
      { error: "Missing 'from' or 'to' parameter" },
      { status: 400 }
    );
  }

  const results = await getDevicesInfo(
    user?.id as string,
    queryParams.data.from,
    queryParams.data.to,
    id as string
  );

  return Response.json(results);
}

export type GetDeviceInfoType = Awaited<ReturnType<typeof getDevicesInfo>>;

const getDevicesInfo = async (
  userId: string,
  from: Date,
  to: Date,
  urlsId: string
) => {
  const dayFrom = new Date(from).getUTCDate();
  const monthFrom = new Date(from).getUTCMonth() + 1;
  const yearFrom = new Date(from).getUTCFullYear();

  const dayTo = new Date(to).getUTCDate();
  const monthTo = new Date(to).getUTCMonth() + 1;
  const yearTo = new Date(to).getUTCFullYear();

  try {
    const result = await prisma.deviceHistory.findMany({
      where: {
        userId: userId,
        urlsId: urlsId,
        day: {
          gte: dayFrom,
          lte: dayTo,
        },
        month: {
          gte: monthFrom,
          lte: monthTo,
        },
        year: {
          gte: yearFrom,
          lte: yearTo,
        },
      },
    });

    const allDesktopArrayOfClicked = result.map((item) => item.desktop);
    const allMobileArrayOfClicked = result.map((item) => item.mobile);

    const totalDesktopClicked = allDesktopArrayOfClicked.reduce(
      (a, b) => a + b,
      0
    );
    const totalMobileClicked = allMobileArrayOfClicked.reduce(
      (a, b) => a + b,
      0
    );

    const chartData = [
      {
        device: "Desktop",
        visitors: totalDesktopClicked,
        fill: "var(--color-chrome)",
      },
      {
        device: "Mobile",
        visitors: totalMobileClicked,
        fill: "var(--color-safari)",
      },
    ];

    return {
      chartData,
      totalVisitors: totalDesktopClicked + totalMobileClicked,
    };
  } catch (error) {}
};
