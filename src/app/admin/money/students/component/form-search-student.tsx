"use client";

import * as z from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  major: z.string().min(2).max(50),
  nationality: z.string().min(2).max(50),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select a  gender.",
  }),

  gpa: z.number().min(60, {
    message: "Your gpa should be at least 60",
  }),
  educationDegree: z.enum(["bachelors", "master"], {
    required_error: "You need to select a  degree.",
  }),
});

function FormSearchForAstudent({}) {
  const supabase = createClientComponentClient();
  const [students, setStudents] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      major: "",
      gpa: 60,
      gender: "male",
      nationality: "",
      educationDegree: "bachelors",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .match({
        major: values.major,
        gender: values.gender,
        education_degree: values.educationDegree,
      })
      .gte("gpa", values.gpa);
    console.log(data);
    setStudents(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Let's find the right student</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-2 gap-6">
            <div role="part one of the form">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer science" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student gpa</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
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
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
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
                            <FormLabel className="font-normal">
                              Bachelor's
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="master" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Master
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div role="part two of the form">
              {students.length > 0 ? "Some students" : "No result yet"}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="flex gap-2 items-center px-14">
              <SearchIcon />{" "}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default FormSearchForAstudent;
