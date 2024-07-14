import { isMobileDevice } from "@/helper/detection";

const Page = () => {
  const device = isMobileDevice();
  return (
    <div className="h-screen flex w-full justify-center items-center text-primary">
      {device} M
    </div>
  );
};

export default Page;
