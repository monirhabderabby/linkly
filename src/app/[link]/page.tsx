import { storeClick } from "@/actions/store_click";
import Redirect from "./_component/redirect";

const Page = async ({ params }: { params: { link: string } }) => {
  const url = await storeClick(params.link);

  if (!url) {
    throw new Error("URL not found. Please provide a valid URL.");
  }

  return (
    <div className="container h-[calc(100vh-80px)] flex justify-center items-center">
      <Redirect url={url} />
    </div>
  );
};

export default Page;
