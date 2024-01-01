import Container from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  applicationStatus: string;
}

export default function UserMessage({ applicationStatus }: Props) {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>{applicationStatus}</CardTitle>
          <CardDescription>Your application status</CardDescription>
        </CardHeader>
        <CardContent className="bg-opacity-50 pt-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Welcome to unifunds dashboard
          </h3>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Go to settings </li>
            <li>Profile</li>
            <li>fill your info</li>
            <li>keep in touch </li>
            <li>Once accepted you will recieve an email from us </li>
          </ul>
        </CardContent>
        <CardFooter className="pt-4 pb-2">
          <p className="text-muted-foreground text-sm">
            {" "}
            If you have any problem you can contact us via
            <Link
              className="text-accent-foreground"
              href="mailto:support@unifunds.com"
            >
              {" "}
              support@unifunds.com
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
}
