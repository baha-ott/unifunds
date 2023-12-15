import Container from "@/components/layout/container";
import { TypographyP } from "@/components/shared-components/typography/typographyP";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function HowToApply() {
  const stepsToApply = [
    {
      title: "Sign up",
      description: "Craete your accout by clickin on apply now",
      imgSrc: "/imgs/apply/sign-up.svg",
    },
    {
      title: "Configure your dashboard",
      description: "Visit your dashboard and fill your information",
      imgSrc: "/imgs/apply/dashboard.svg",
    },
    {
      title: "Finally",
      description:
        "Wait to hear from us, we will contact you once find a suitable program for your needs",
      imgSrc: "/imgs/apply/happy.svg",
    },
  ];
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col items-center mb-4 " role="text box">
          <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
            Easy to <span className="text-brand-primary">Apply</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {stepsToApply.map((s, i) => (
            <Card className="w-full border-none shadow-md">
              <CardHeader className="h-80">
                <Image
                  src={s.imgSrc}
                  width={100}
                  height={100}
                  alt={s.description}
                  className="object-cover w-full h-full md:w-full md:h-full "
                />
              </CardHeader>
              <CardContent className="h-32 py-2">
                <h3 className="scroll-m-20 mb-2 text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <TypographyP
                  title={s.description}
                  className="[&:not(:first-child)]:mt-0"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
