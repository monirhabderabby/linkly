"use client";

import { useEffect } from "react";

interface Props {
  url: string;
}
const Redirect = ({ url }: Props) => {
  useEffect(() => {
    window.location.assign(url);
  }, []);
  return <></>;
};

export default Redirect;
