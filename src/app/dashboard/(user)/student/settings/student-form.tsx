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
import { useEffect } from "react";

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select a  gender.",
  }),
  gpa: z.number().min(60, {
    message: "Your gpa should be at least 60",
  }),
  nationality: z.string().min(3, {
    message: "nationality should be at least 3 charchters",
  }),
  birthyear: z.date({
    required_error: "A date of birth is required.",
  }),
  expectedGraduationDate: z.date({
    required_error: "required field.",
  }),
  major: z.string().min(2, {
    message: "major is required",
  }),
  educationDegree: z.enum(["bachelors", "master"], {
    required_error: "You need to select a  degree.",
  }),
});

export default function StudentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      gender: "male",
      gpa: 60,
      nationality: "",
      major: "",
      educationDegree: "bachelors",
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
      .from("students")
      .select("*")
      .eq("user_id", userId);

      console.log({ddd: data})
    // check if the user exist
    if (data && data.length > 0) {
      const { data, error } = await supabase
        .from("students")
        .update({
          fullname: values.fullname,
          birthyear: values.birthyear,
          expected_graduate_date: values.expectedGraduationDate,
          gender: values.gender,
          gpa: values.gpa,
          nationality: values.nationality,
          major: values.major,
          education_degree: values.educationDegree,
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
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });
      return;
    }

    const { data: insertData, error: errorInsert } = await supabase
      .from("students")
      .insert({
        fullname: values.fullname,
        birthyear: values.birthyear,
        expected_graduate_date: values.expectedGraduationDate,
        gender: values.gender,
        gpa: values.gpa,
        nationality: values.nationality,
        major: values.major,
        education_degree: values.educationDegree,
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
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                The fullname should be the same as your ID card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your gpa</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your gpa should be at least 60</FormDescription>
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
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major</FormLabel>
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
          name="birthyear"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectedGraduationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expected Graduate date</FormLabel>
              <Popover>
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
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educationDegree"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bachelors" />
                    </FormControl>
                    <FormLabel className="font-normal">Bachelor's</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="master" />
                    </FormControl>
                    <FormLabel className="font-normal">Master</FormLabel>
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
