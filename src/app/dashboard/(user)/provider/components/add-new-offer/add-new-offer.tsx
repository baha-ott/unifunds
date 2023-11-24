import { Button } from "@/components/ui/button";
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
import { FormAddNewOffer } from "./form-add-new-offer";
import { Portal } from "@radix-ui/react-dialog";

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
