"use client";

import { urls } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import QRCode from "react-qr-code";
import { CellAction } from "./cell-action";
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
    header: "Short Link",
  },
  {
    accessorKey: "original_url",
    header: "Original Link",
  },
  {
    header: "QR Code",
    id: "actions",
    cell: ({ row }) => (
      <div className="">
        <QRCode value={row.original.original_url} size={40} />
      </div>
    ),
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
