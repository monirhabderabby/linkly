"use client";

import { useEffect } from "react";
import { BarLoader } from "react-spinners";

interface Props {
  url?: string;
}
const Redirect = ({ url }: Props) => {
  // const { isLoading, data } = useQuery({
  //   queryKey: [shortUrl],
  //   queryFn: () =>
  //     fetch(`/api/store_click?shorturl=${shortUrl}`).then((res) => res.json()),
  // });
  useEffect(() => {
    window.location.assign(url as string);
  }, []);
  return (
    <>
      <div>
        {" "}
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </div>
    </>
  );
};

export default Redirect;
