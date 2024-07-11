"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { urls } from "@prisma/client";
import { Copy, Download, Link, Trash } from "lucide-react";
import moment from "moment";
import { QRCode } from "react-qrcode-logo";

interface Props {
  data: urls;
}

const UrlOverview = ({ data }: Props) => {
  const origin = useOrigin();
  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-4xl text-foreground font-semibold">{data?.name}</h1>
      <a
        className="text-primary underline-offset-4 hover:underline"
        href={`${origin}/${data?.short_url}`}
        target={"_blank"}
      >{`${origin}/${data?.short_url}`}</a>

      <div className="flex items-center gap-x-2">
        <Link className="h-4 w-4 text-foreground" />
        <p className="text-foreground text-xs md:text-sm lg:text-[15px]">
          {data?.original_url}
        </p>
      </div>
      <p className="text-muted-foreground text-xs md:text-sm lg:text-[15px]">
        {moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>

      <div className="flex items-center gap-x-6 mt-[50px]">
        <button>
          <Copy />
        </button>
        <button>
          <Download />
        </button>
        <button>
          <Trash />
        </button>
      </div>

      <div className="mt-[20px]">
        <QRCode value={data?.original_url} size={250} />
      </div>
    </div>
  );
};

export default UrlOverview;
