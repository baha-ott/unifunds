"use client";

// zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  type: z.enum(["profit", "non profit"], {
    required_error: "You need to select a  type.",
  }),
  businessRate: z.number().min(60, {
    message: "Your businessRate should be at least 60",
  }),
  nationality: z.string().min(3, {
    message: "nationality should be at least 3 charchters",
  }),
  description: z.string().min(2, {
    message: "description is required",
  }),
});

export default function ProviderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "profit",
      businessRate: 60,
      nationality: "",
      description: "",
    },
  });

  const supabase = createClientComponentClient();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // get the student data

    const {
      data: { user },
      error: errorUser,
    } = await supabase.auth.getUser();

    if (!user || errorUser) {
      toast({
        title: "Something went wrong while fetching user",
      });

      return;
    }

    const { id: userId } = user;

    const { data } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", userId);

    // check if the user exist
    if (data) {
      const { data, error } = await supabase
        .from("providers")
        .update({
          instution_name: values.name,
          type: values.type,
          rate: values.businessRate,
          nationality: values.nationality,
          description: values.description,
        })
        .eq("user_id", userId);

      if (error) {
        toast({
          title: "Something went wrong while updating user",
          description: <p>{error.message}</p>,
        });
      }

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
      return;
    }

    const { data: insertData, error: errorInsert } = await supabase
      .from("providers")
      .insert({
        instution_name: values.name,
        type: values.type,
        rate: values.businessRate,
        nationality: values.nationality,
        description: values.description,
      });

    if (errorInsert) {
      toast({
        title: "Something went wrong while inserting your profile data",
      });

      return;
    }

    // if the user exist update the specified student row

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                The name should be the same as your ID card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your businessRate</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Your businessRate should be at least 60
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                For double citizen stduents enter th3e nationality as the
                following format Palestian - Spanish
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                For double citizen stduents enter th3e nationality as the
                following format Palestian - Spanish
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="profit" />
                    </FormControl>
                    <FormLabel className="font-normal">profit</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="non profit" />
                    </FormControl>
                    <FormLabel className="font-normal">non profit</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
