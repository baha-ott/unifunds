"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import InputUploadFile from "./InputUploadFile";

interface Props {
  filesToUpload: FileUpload[];
}

export default function FormtableUpload({ filesToUpload }: Props) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        const { id } = user;
        setUserId(id);
      }
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">File Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Upload / download</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filesToUpload.map((f) => {
            return (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.title}</TableCell>
                <InputUploadFile id={f.id} userId={userId} status={f.status} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
