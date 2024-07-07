import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[calc(100vh-60px)]">
      <div className="auth flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
