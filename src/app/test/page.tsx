import DataTable from "../dashboard/student/settings/documents/components/form-table-upload";

export default async function DemoPage() {
  const filesToUpload = [
    {
      name: "id-card",
      id: "id-card",
      title: "ID",
    },
    {
      name: "student-proof",
      id: "student-proof",
      title: "Proof of student",
    },
    // make sure the id have to be the same as the folder name in the supabase storage
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable filesToUpload={filesToUpload} />
    </div>
  );
}
