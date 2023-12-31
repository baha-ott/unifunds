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
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverDialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Offer title must be at least 5 characters",
  }),
  amount: z.coerce.number().min(200, {
    message: "Expected number, received a string",
  }),
  students: z.coerce.number().min(1, {
    message: "At least 1 student",
  }),
  major: z.string().min(1, {
    message: "Major is required",
  }),
  description: z.string(),
  scholarship_type: z.string(),
  support_start: z.date(),
  support_end: z.date(),
});

export function FormAddNewOffer() {
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      students: 1,
      major: "",
      description: "",
      scholarship_type: "money",
      support_start: new Date(),
      support_end: new Date(),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);

    if (values.amount / values.students < 150) {
      toast({
        title: "Can't submit",
        description: <p>Each student should recive at least 150 $</p>,
      });

      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Something went wrong",
        description: "Failed getting user",
      });

      return;
    }

    const { id: userId, email } = user;

    const { data, error } = await supabase.from("offers").insert({
      provider_id: userId,
      provider: email,
      description: values.description,
      amount_money: +values.amount,
      amount_students: values.students,
      major: values.major,
      title: values.title,
      start_date_support: values.support_start,
      end_date_support: values.support_end,
      support_type: values.scholarship_type,
    });

    console.log(values.support_start, values.support_end);

    if (error) {
      toast({
        title: "An error occured",
        description: error.message,
      });

      return;
    }

    toast({
      title: "Submitted",
      description: "Form submitted correctly",
    });

    form.reset();

    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Offer title</FormLabel>
                <FormControl>
                  <Input placeholder="Offer title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Offer Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount in dollar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Students amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount in dollar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Computer science</FormLabel>
                <FormControl>
                  <Input placeholder="Amount in dollar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="support_start"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Support start date</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="support_end"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Support end date</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="scholarship_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Support type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="money">Money</SelectItem>
                  <SelectItem value="scholarship">Schoolarship</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Computer science</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about the grant, For example any specific requirements, Target universities ...etc"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                If description is not provided we will assume that this grant is
                for general purpose
              </FormDescription>
            </FormItem>
          )}
        />

        <FormDescription className="text-danger">
          after submitting the offer you will recieve related documents to be
          signed between us to upload asked documents you can do that by go to
          documents in your settings
        </FormDescription>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
