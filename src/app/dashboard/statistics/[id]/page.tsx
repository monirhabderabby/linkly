import prisma from "@/lib/db";
import { urls } from "@prisma/client";
import Stats from "./_components/stats";
import UrlOverview from "./_components/url-overview";

export type countryChartType = {
  country: string;
  clicks: number;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await prisma.urls.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <section className="container">
      <div className="w-full py-8">
        <UrlOverview data={data as urls} />
        <div className="flex-1">
          <Stats id={params.id} />
        </div>
      </div>
    </section>
  );
};

export default Page;
