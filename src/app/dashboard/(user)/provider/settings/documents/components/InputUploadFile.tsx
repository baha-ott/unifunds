"use client";
import Loading from "@/components/shared-components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { isJSON } from "@/lib/helpers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  userId: string;
  id: string;
  status: string;
};

function InputUploadFile({ userId, id, status }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const supabase = createClientComponentClient();

  async function handleUploadOperation(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);

    const id = e.target.id;
    const files = e.target.files;

    if (!files) return;
    const file = files[0];

    const fileType = id;

    const { error: errorUploading } = await supabase.storage
      .from("profile")
      .upload(`/${fileType}/${userId}-${fileType}`, file);

    if (errorUploading?.message) {
      setError(errorUploading.message);
      setLoading(false);
      return;
    }

    const { data: filesData, error: errorUpdateDatabase } = await supabase
      .from("profile")
      .select("files, user_id");

    if (filesData) {
      const { files: filesToUpdate, user_id: userId } = filesData[0];
      console.log(userId);

      const filteredFilesToUpdate = JSON.parse(filesToUpdate).map(
        (f: FileUpload) => {
          console.log(f.id === fileType);
          if (f.id === fileType) {
            return {
              ...f,
              status: "uploaded",
            };
          }

          return f;
        }
      );


      const { data: updateFilesInDataBase, error: errorUpdateFilesInDatabase } =
        await supabase
          .from("profile")
          .update({ files: JSON.stringify(filteredFilesToUpdate) })
          .eq("user_id", userId);

      console.log(updateFilesInDataBase);
      if (errorUpdateFilesInDatabase) {
        throw new Error(errorUpdateFilesInDatabase.message);
      }
    }

    setError(null);
    setLoading(false);
    router.refresh();
  }

  return (
    <>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Button
          size="sm"
          variant={`${error ? "destructive" : "outline"}`}
          className="relative"
          disabled={status !== "upload"}
        >
          {loading && <Loading />}
          {error && "Retry"}
          {!error && status}
          <label
            htmlFor={id}
            className="absolute top-0 left-0 w-full h-full"
            // to make the label clickable
          ></label>
        </Button>
        <Input
          type="file"
          id={id}
          style={{ display: "none" }}
          onChange={handleUploadOperation}
        />
      </TableCell>
    </>
  );
}

export default InputUploadFile;
