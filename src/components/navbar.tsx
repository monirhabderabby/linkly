import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { ButtonAnimation } from "./snippet/button-animation";
import { ThemeSwitch } from "./ui/theme-switch";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="container w-full flex justify-between h-[80px] items-center ">
      <Link href="/" className="gradient text-[36px] font-bold">
        Linkly
      </Link>
      <div className="flex items-center gap-x-4">
        <Link href="/dashboard" className="text-[14px] text-muted-foreground ">
          Dashboard
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
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
