import Form from "@/components/form";
import { CircleHelp } from "lucide-react";
import Image from "next/image";
import banner from "../../public/linkly.webp";

export default function Home() {
  return (
    <main className="container min-h-screen">
      <section className="mt-[60px] min-h-screen w-full flex flex-col lg:justify-center items-center space-y-6 ">
        <h1 className="text-3xl gradient font-extrabold text-center">
          Shorten Your Loooong Links : )
        </h1>
        <p className="text-foreground text-center max-w-[634px]">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>

        <div>
          <Form />
        </div>
        <div>
          <p className="flex items-center gap-x-2 text-[14px]">
            You can create{" "}
            <span className="text-rose-600 font-semibold">05</span> more links.
            Register Now to enjoy Unlimited usage{" "}
            <CircleHelp className="w-4 h-4" />
          </p>
        </div>

        <div className="w-full lg:w-5/6 h-[220px] md:h-[400px] lg:h-[700px] relative">
          <Image
            src={banner}
            alt="banner"
            fill
            className="border-2 rounded-md md:mt-6 lg:mt-12"
            placeholder="blur"
          />
        </div>
      </section>
    </main>
  );
}
