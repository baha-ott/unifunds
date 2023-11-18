"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
  id: string;
  file: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "file",
    header: "File",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "amount",
    header: "Amount",
  },
];
