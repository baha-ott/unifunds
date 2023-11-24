import { OffersTable } from "../../dashboard/(user)/admin/components/tables/offers/offers-table";
import { columns } from "../../dashboard/(user)/admin/components/tables/offers/offers-columns";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function OffersPage() {
  const supabse = createServerComponentClient({ cookies });

  const { data: offers, error } = await supabse.from("offers").select();

  if (!offers || error) {
    throw new Error("something went wrong white fetching offers");
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">pinned offers</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        <OffersTable columns={columns} data={offers} />
      </div>
    </main>
  );
}
