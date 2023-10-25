// zod
import * as z from "zod";
// hooks
import { useRouter } from "next/navigation";
// components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useState } from "react";
import BtnFormSubmit from "@/components/shared-components/BtnFormSubmit";

const FormSchema = z.object({
  role: z.string(),
  firstname: z.string().min(3).max(20),
  lastname: z.string().min(3).max(20),
  country: z.string().min(1),
  address: z.string(),
});

export default function FormInputs() {
  const [formStatus, setFormStatus] = useState<"" | "loading">("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: "",
      firstname: "",
      lastname: "",
      country: "",
      address: "",
    },
  });
  const router = useRouter();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormStatus("loading");
    const sendUserRole = async () => {
      const res = await fetch("http://localhost:3000/api/user/role", {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });
      // to update the user role
      const supabseBodyRes = await res.json();
      console.log(supabseBodyRes);
      const { error } = supabseBodyRes;

      if (error) {
        setFormStatus("");
        throw new Error(
          "something went wrong while setting up your profile contact us or try again later"
        );
      }
      setFormStatus("");
      router.refresh();
    };

    sendUserRole();
  }

  const formItems: {
    name: "firstname" | "lastname" | "country" | "role" | "address";
    placeholder: string;
    label: string;
  }[] = [
    {
      name: "firstname",
      placeholder: "John",
      label: "Firstname",
    },
    {
      name: "lastname",
      placeholder: "Doe",
      label: "Lastname",
    },
    {
      name: "address",
      placeholder: "Madrid - 21st",
      label: "Address",
    },
  ];
  countries.registerLocale(enLocale);
  const countriesNames = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countriesNames).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 "
      >
        <div className="grid gap-2 grid-cols-2">
          {formItems.map(({ name, placeholder, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Where are you from" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="max-h-96">
                    {countryArr.map(({ label }) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set up your profile as</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Student / Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="provider">Scholarship Provider</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-danger">
                You will not be able to change this option later
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <BtnFormSubmit
          title="Next"
          loadingTitle="Preparing your profile"
          state={formStatus}
        />
      </form>
    </Form>
  );
}
