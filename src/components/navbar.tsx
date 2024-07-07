import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { ButtonAnimation } from "./snippet/button-animation";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="container w-full flex justify-between h-[60px] items-center ">
      <Link href="/" className="gradient text-[36px] font-bold">
        Linkly
      </Link>
      {userId ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <ButtonAnimation
            variant="expandIcon"
            Icon={LogInIcon}
            iconPlacement="right"
          >
            Login
          </ButtonAnimation>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
