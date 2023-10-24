import Container from "@/components/layout/container";
import BtnPrimary from "@/components/shared-components/btn-primary";
import TypographyH1 from "@/components/shared-components/typography/typographyH1";
import { TypographyP } from "@/components/shared-components/typography/typographyP";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

// image src

export default function Hero() {
  return (
    <section>
      <Container
        aria-label="hero text box"
        className="flex flex-col items-center py-12 sm:py-16 sm:max-w-3xl xl:max-w-5xl xl:py-32"
      >
        <TypographyH1
          title="Support the palestinian's top students"
          className="text-gray-primary text-center"
        />
        <TypographyP
          title="We in unifunds believes that every palestinian have the right to learn, Our mession is to make sure that 
        the scholarships goes to the right students, suppors us now"
          className="sm:px-12 text-center"
        />
        <div
          aria-label="call to action button to encourage user to support students"
          className="mb-4 mt-8 flex gap-2 justify-center xl:justify-start"
        >
          <BtnPrimary title="Support students" />
          <Button variant="outline" className="">
            <Link href="/">Why us 🤔?</Link>
          </Button>
        </div>
        <Separator className="mt-16 mb-8" />
      </Container>
    </section>
  );
}
