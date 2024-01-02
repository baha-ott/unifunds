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

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DialogUser({ user }: { user: any }) {
  console.log({user})
  const [isUserAccepted, setIsUserAccepted] = useState<boolean>(false);

  const supabase = createClientComponentClient();
  const date = new Date(user.created_at).toDateString();

  //   {\"id\":\"id-card\",\"name\":\"id-card\",\"title\":\"ID / Passport\",\"status\":\"upload\"}

  async function handleAccept(e: React.MouseEvent) {
    const clicked = e.target as HTMLButtonElement;
    const clickedType = clicked.dataset.clicked;

    if (clickedType === "reject") {
      await supabase
        .from("user")
        .update({ is_accepted: false })
        .eq("user_id", user.user_id);

      await supabase
        .from("user")
        .update({ status: "rejected" })
        .eq("user_id", user.user_id);
    }
    if (clickedType === "accept") {
      await supabase
        .from("user")
        .update({ is_accepted: true })
        .eq("user_id", user.user_id);
      await supabase
        .from("user")
        .update({ status: "accepted" })
        .eq("user_id", user.user_id);
    }
  }

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", user.user_id);

      if (data && data?.length > 0) {
        const { is_accepted } = data[0];

        if (is_accepted) {
          setIsUserAccepted(true);
        }
      }
    }
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <EyeIcon className="text-gray-400" />
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-screen lg:h-auto lg:overflow-y-hidden">
          <DialogHeader>
            <DialogTitle>{user.email}</DialogTitle>
            <DialogDescription>{date}</DialogDescription>
          </DialogHeader>

          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <Label>Fullname</Label>
                  <Input value={`${user.fullname}`} disabled />
                </div>
                <div className="w-full">
                  <Label>birthyear</Label>
                  <Input value={`${user.birthyear}$`} disabled />
                </div>
              </div>
              <div className=" flex items-center gap-2">
                <div className="w-full">
                  <Label>Degree</Label>
                  <Input value={`${user.education_degree}`} disabled />
                </div>

                <div className="w-full">
                  <Label>To</Label>
                  <Input value={user.end_date_support} disabled />
                </div>
              </div>
              {user ? (
                <>
                  {" "}
                  <div className="">
                    <Label>Major</Label>
                    <Input value={user.major} disabled />
                  </div>
                  <div className="">
                    <Label>University</Label>
                    <Input value={user.university} disabled />
                  </div>
                  <div className="">
                    <Label>Offer Description</Label>
                    <Textarea value={user.nationality} disabled />
                  </div>
                </>
              ) : (
                "No profile"
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <div
              className="w-full space-x-2"
              data-clicked="div"
              onClick={handleAccept}
            >
              {!isUserAccepted ? (
                `no action to take`
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
    </>
  );
}
