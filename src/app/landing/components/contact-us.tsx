/**
 * v0 by Vercel.
 * @see https://v0.dev/t/etpTnZOpEHf
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 bg-gradient-to-r from-pink-400 to-yellow-300 p-6 rounded-md">
      <Card className="max-w-md mx-auto md:mx-0 md:w-1/2 bg-white shadow-lg rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-fredoka-one text-blue-600">
            Hey There!
          </CardTitle>
          <CardDescription className="text-gray-500">
            Got something to say? We're all ears!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="What's your first name?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="And your last name?" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Your email goes here..."
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              placeholder="What's on your mind?"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-500 text-white" type="submit">
            Send it!
          </Button>
        </CardFooter>
      </Card>
      <div className="max-w-md mx-auto md:mx-0 md:w-1/2 flex flex-col justify-center items-start text-gray-800">
        <h2 className="text-2xl font-fredoka-one text-blue-600 mb-2">
          Don't be a stranger!
        </h2>
        <p className="leading-relaxed">
          <HeartHandshakeIcon className="w-4 h-4 inline-block mr-1" />
          We love hearing from you. So go ahead and drop us a line. We promise
          we'll get back to you as soon as we can!
          {"\n              "}
        </p>
      </div>
    </div>
  );
}

function HeartHandshakeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}
