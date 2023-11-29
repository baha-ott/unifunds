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

export default function DialogUser({ user }: { user: any }) {
  const { profile } = user;

  const supabase = createClientComponentClient();
  const date = new Date(user.created_at).toDateString();

  //   {\"id\":\"id-card\",\"name\":\"id-card\",\"title\":\"ID / Passport\",\"status\":\"upload\"}

  async function handleAccept(e: React.MouseEvent) {
    const clicked = e.target as HTMLButtonElement;
    const clickedType = clicked.dataset.clicked;
  }

  return (
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
                <Input value={`${user.firstname} ${user.lastname}`} disabled />
              </div>
              <div className="w-full">
                <Label>Role</Label>
                <Input value={`${user.role}$`} disabled />
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="w-full">
                <Label>Location</Label>
                <Input value={`${user.address} - ${user.country}`} disabled />
              </div>

              <div className="w-full">
                <Label>To</Label>
                <Input value={user.end_date_support} disabled />
              </div>
            </div>
            {profile && user.role === "student" ? (
              <>
                {" "}
                <div className="">
                  <Label>Major</Label>
                  <Input value={profile.major} disabled />
                </div>
                <div className="">
                  <Label>University</Label>
                  <Input value={profile.university} disabled />
                </div>
                <div className="">
                  <Label>Offer Description</Label>
                  <Textarea value={profile.nationality} disabled />
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
            {user.application_status === "reject" ||
            user.application_status === "accept" ? (
              `${user.application_status}ed no action to take`
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
