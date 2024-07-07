import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mt-[-100px]">
      <div className="auth flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}
