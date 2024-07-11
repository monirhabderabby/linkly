import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const Page = async ({ params }: { params: { link: string } }) => {
  const user = await currentUser();
  const url = await prisma.urls.findUnique({
    where: {
      userId: user?.id,
      short_url: params.link,
    },
    select: {
      original_url: true,
    },
  });

  if (!url) {
    throw new Error("URL not found");
  }
  return (
    <div className="container h-[calc(100vh-80px)] flex justify-center items-center">
      {url.original_url}
    </div>
  );
};

export default Page;
