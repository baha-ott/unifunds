"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  amount: z.number().min(200),
  payed_on: z.coerce.date(),
  status: z.string(),
  by: z.string(),
  transaction_id: z.string().min(10, {
    message: "Tranaction must be at least 10 characters",
  }),
});

export function AddTransactionForm() {
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 200,
      payed_on: new Date(),
      status: "recieved",
      by: "",
      transaction_id: "",
    },
  });

  const [providers, setProviders] = useState<any>(null);

  // 2. Define a submit handler.
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (values.amount < 200) {
      toast({
        title: "Can't submit",
        description: <p>The amound could only be 200$ $</p>,
      });

      return;
    }

    const { data: offer, error: offerError } = await supabase
      .from("offers")
      .select("*")
      .eq("email", values.by);

    if (!offer) {
      toast({
        title: "Can't add the transaction ",
        description: "please check the provider email",
      });

      return;
    }

    if (offerError) {
      toast({
        title: "Something went wrong",
        description: offerError,
      });

      return;
    }

    const { data, error } = await supabase.from("transactions").insert({
      title: values.title,
      amount: values.amount,
      by: offer[0].provider_id,
      transaction_id: values.transaction_id,
      payed_on: values.payed_on,
      status: values.status,
    });

    if (error) {
      toast({
        title: "An error occured",
        description: error.message,
      });

      return;
    }

    toast({
      title: "Submitted",
      description: "Transaction added correctly",
    });

    form.reset();

    return;
  }

  const handleSearchForProvider = async (provider: string) => {
    if (provider.length > 0) {
      const { data: providers, error: providersError } = await supabase
        .from("offers")
        .select("*")
        .textSearch("email", provider, {
          type: "websearch",
          config: "english",
        });

      setProviders(provider);
    }
  };
  console.log(providers);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full">
          <FormField
            control={form.control}
            name="transaction_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction id</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payed_on"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pay date</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input type="date" placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount in dollar</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
