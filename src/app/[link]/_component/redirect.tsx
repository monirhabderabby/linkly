"use client";

import useDeviceDetect from "@/hooks/useDeviceDetect";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

interface Props {
  shortUrl: string;
}

const Redirect = ({ shortUrl }: Props) => {
  const device = useDeviceDetect();

  const { isLoading, data, error } = useQuery<string>({
    queryKey: [device, shortUrl],
    queryFn: () =>
      fetch(`/api/clicked?shortUrl=${shortUrl}&device=${device}`).then((res) =>
        res.json()
      ),
  });
  useEffect(() => {
    if (data) {
      window.location.assign(data as string);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);
  return (
    <>
      {isLoading && (
        <div>
          {" "}
          <BarLoader width={"100%"} color="#36d7b7" />
          <br />
          Redirecting...
        </div>
      )}
    </>
  );
};

export default Redirect;
