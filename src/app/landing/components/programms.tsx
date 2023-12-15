import Container from "@/components/layout/container";
import TypographyH2 from "@/components/shared-components/typography/typographyH2";
import { TypographyP } from "@/components/shared-components/typography/typographyP";
import { Separator } from "@/components/ui/separator";
import { pl } from "date-fns/locale";
import { ArrowRightCircle, MoveUpRightIcon } from "lucide-react";
import Image from "next/image";

export default function Programs() {
  const programs = [
    {
      title: "Erasmus programs",
      description:
        "This program allows you to travel to study a semester in europe",
      imgSrc: "/imgs/programs/money.svg",
      suit: ["university students", "Master degrees"],
    },
    {
      title: "Unifunds programs",
      description:
        "These programms are funded by unifunds in partner with other instutions",
      imgSrc: "/imgs/programs/travel.svg",
      suit: ["Anyone wants to learn"],
    },
  ];
  return (
    <section role="programs section" className="py-28">
      <Container>
        <div className="flex flex-col items-center " role="text box">
          <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
            Our <span className="text-brand-primary">programs</span>
          </h2>
          <TypographyP
            title="Have a look at our programs that we provide for the students"
            className="leading-7 text-center  mt-0 md:w-1/2"
          />
        </div>

        <div className="flex flex-col gap-12 mt-9">
          {programs.map((p, i) => (
            <>
              <div className="flex flex-col px-2 md:px-0 md:flex-row w-full relative py-4 transition-shadow hover:cursor-pointer hover:shadow-md">
                <div className="h-48 w-96 mb-8 md:mb-0">
                  <Image
                    src={p.imgSrc}
                    width={100}
                    height={100}
                    alt="Program description"
                    className="w-full h-full object-fill"
                  />
                </div>

                <div
                  role="program details box"
                  className="flex flex-col justify-between"
                >
                  <div className="mb-4 md:mb-0">
                    <TypographyH2 title={p.title} />
                    <TypographyP
                      title={p.description}
                      className="[&:not(:first-child)]:mt-0"
                    />
                  </div>

                  <div className="mt-auto">
                    <p className="mb-1">sutiable for</p>
                    <div className="flex gap-2">
                      {p.suit.map((s) => (
                        <span className="border border-1 border-opacity-50 rounded-sm border-gray-800 inline-block px-4 py-1">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-12 h-12 absolute top-0 right-0 bg-brand-primary bg-opacity-10 flex items-center justify-center rounded-full">
                  <MoveUpRightIcon className="text-brand-primary" />
                </div>
              </div>
              {i < programs.length - 1 && <Separator />}
            </>
          ))}
        </div>
      </Container>
    </section>
  );
}
