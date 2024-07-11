"use client";

import { urls } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { CellAction } from "./cell-action";
import QrControll from "./Qr-control";
import ShortLinkControll from "./short-link-controll";
// import { QRCode } from "react-qrcode-logo";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<urls>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "short_url",
    id: "Short Link",
    cell: ({ row }) => <ShortLinkControll url={row.original.short_url} />,
  },
  {
    accessorKey: "original_url",
    header: "Original Link",
  },
  {
    header: "QR Code",
    id: "actions",
    cell: ({ row }) => <QrControll url={row.original.original_url} />,
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    header: "Date",
    id: "date",
    cell: ({ row }) => (
      <div>{moment(row.original.createdAt).format("lll")}</div>
    ),
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => (
      <div>
        <CellAction id={row.original.id} />
      </div>
    ),
  },
];
