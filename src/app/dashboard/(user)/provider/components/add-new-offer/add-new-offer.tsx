import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormAddNewOffer } from "./form-add-new-offer";

export default function AddNewOffer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Offer a grant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-screen-md overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Make new offer</DialogTitle>
          <DialogDescription>
            Let's make the world better together.
          </DialogDescription>
        </DialogHeader>
        <FormAddNewOffer />
      </DialogContent>
    </Dialog>
  );
}
