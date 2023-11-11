import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import FormtableUpload from "./components/form-table-upload";
import { cookies } from "next/headers";
import { isJSON } from "@/lib/helpers";

export default async function DocumentsPage() {
  // make sure the id have to be the same as the folder name in the supabase storage
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("profile").select();

  if (error) {
    throw new Error(error.message);
  }

  const filesToUpload = JSON.parse(data[0].files);

  return (
    <div className="container mx-auto py-10">
      <FormtableUpload filesToUpload={filesToUpload} />
    </div>
  );
}
