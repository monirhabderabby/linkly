import prisma from "@/lib/db";
import { urls } from "@prisma/client";
import UrlOverview from "./_components/url-overview";

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await prisma.urls.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <section className="container">
      <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-x-12 py-8">
        <UrlOverview data={data as urls} />
        <div className="flex-1 bg-blue-500"></div>
      </div>
    </section>
  );
};

export default Page;
