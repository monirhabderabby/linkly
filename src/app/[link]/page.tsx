import Redirect from "./_component/redirect";

const Page = async ({ params }: { params: { link: string } }) => {
  return (
    <div className="container h-[calc(100vh-80px)] flex justify-center items-center">
      <Redirect shortUrl={params.link} />
    </div>
  );
};

export default Page;
