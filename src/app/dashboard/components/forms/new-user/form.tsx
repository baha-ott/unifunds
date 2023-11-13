import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInputs from "./form-inputs";

export default function FormSelectRole() {
  return (
    <Card className="animate-[load_0.5s_ease-in]">
      <CardHeader>
        <CardTitle>Welcome to your dashboard</CardTitle>
        <CardDescription>
          Let&apos;s start preparing your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormInputs />
      </CardContent>
      <CardFooter>
        <CardDescription>
          You will be directed to your dashboard after filling the form
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
