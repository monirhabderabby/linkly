import { LogInIcon } from "lucide-react";
import { ButtonAnimation } from "./snippet/button-animation";

const Navbar = () => {
  return (
    <div className="container w-full flex justify-between h-[60px] items-center ">
      <h1 className="gradient text-[36px] font-bold">Linkly</h1>
      <ButtonAnimation
        variant="expandIcon"
        Icon={LogInIcon}
        iconPlacement="right"
      >
        Login
      </ButtonAnimation>
    </div>
  );
};

export default Navbar;
