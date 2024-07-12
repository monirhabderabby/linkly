import { BarLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="container min-h-screen w-full flex justify-center items-center flex-col">
      <BarLoader width={"100%"} color="#36d7b7" />
      <br />
      Redirecting...
    </div>
  );
};

export default loading;
