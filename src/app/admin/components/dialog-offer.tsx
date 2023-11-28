"use client";
import BtnPrimary from "@/components/shared-components/btn-primary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { EyeIcon } from "lucide-react";
import { json } from "node:stream/consumers";

export default function DialogOffer({ offer }: { offer: any }) {
  const supabase = createClientComponentClient();
  const date = new Date(offer.created_at).toDateString();

  //   {\"id\":\"id-card\",\"name\":\"id-card\",\"title\":\"ID / Passport\",\"status\":\"upload\"}

  async function handleAccept(e: React.MouseEvent) {
    const clicked = e.target as HTMLButtonElement;
    const clickedType = clicked.dataset.clicked;

    if (clickedType === "div") {
      return;
    }

    const { data, error } = await supabase
      .from("profile")
      .select("files")
      .eq("user_id", offer.provider_id);

    if (!data || data.length < 1 || error) {
      toast({
        title: "Error",
        description: "Failed during accept the offer",
      });

      return;
    }

    const { files } = data[0];

    const filesArr = JSON.parse(files);
    if (!filesArr) {
      toast({
        title: "Error",
      });
      return;
    }
    const newFile = {
      id: offer.id,
      name: "offers-files",
      title: offer.title,
      status: "upload",
    };

    const newFiles = JSON.stringify([...filesArr, newFile]);

    const { error: errorUpdateFiles } = await supabase
      .from("profile")
      .update({ files: newFiles })
      .eq("user_id", offer.provider_id);

    const { error: errorUpdateOfferStatus } = await supabase
      .from("offers")
      .update({ status: clickedType })
      .eq("id", offer.id);

    if (errorUpdateFiles) {
      toast({
        title: "An error occured during accept the offer",
      });
      return;
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <EyeIcon className="text-gray-400" />
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen lg:h-auto lg:overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{offer.provider}</DialogTitle>
          <DialogDescription>{date}</DialogDescription>
        </DialogHeader>

        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-full">
                <Label>Offer title</Label>
                <Input value={offer.title} disabled />
              </div>
              <div className="w-full">
                <Label>Budget</Label>
                <Input value={`${offer.amount_money}$`} disabled />
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="w-full">
                <Label>From</Label>
                <Input value={offer.start_date_support} disabled />
              </div>
              <div className="w-full">
                <Label>To</Label>
                <Input value={offer.end_date_support} disabled />
              </div>
            </div>
            <div className="">
              <Label>Supported students amount</Label>
              <Input value={offer.amount_students} disabled />
            </div>
            <div className="">
              <Label>Required majors</Label>
              <Input value={offer.major} disabled />
            </div>

            <div className="">
              <Label>Offer Description</Label>
              <Textarea value={offer.description} disabled />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <div
            className="w-full space-x-2"
            data-clicked="div"
            onClick={handleAccept}
          >
            {offer.status === "reject" || offer.status === "accept" ? (
              `${offer.status}ed no action to take`
            ) : (
              <>
                {" "}
                <BtnPrimary data-clicked="accept">Accept</BtnPrimary>
                <Button data-clicked="reject" variant="destructive">
                  Reject
                </Button>
                <Button data-clicked="review" variant="secondary">
                  Review
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
