"use client";

import BtnPrimary from "@/components/shared-components/btn-primary";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "./AddTransactionForm";

function NewTransactionButton({}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-1/2">
        <DialogHeader>
          <DialogTitle>Add recieved payment from a provider</DialogTitle>
          <DialogDescription>
            Make sure to enter the data correctly
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm />
      </DialogContent>
    </Dialog>
  );
}

export default NewTransactionButton;
