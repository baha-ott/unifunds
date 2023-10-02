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
  const imgSrc = [
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
    { src: "/imgs/partners/erasmus.png", alt: "Erasmus logo" },
  ];
  return (
    <section>
      <Container className="flex flex-col items-center py-8 xl:flex-row xl:py-8 gap-8">
        <div aria-label="text-box">
          <TypographyH1
            className="text-center xl:text-left"
            title="some title goes here until i found the right title"
          />
          <TypographyP
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
          consectetur vitae, reiciendis porro soluta dolorem cupiditate sunt
          eveniet sapiente explicabo iusto autem, corporis tenetur fugiat
          corrupti facilis, accusamus voluptates. Dolorem?"
            className="text-center xl:text-left"
          />
          <div
            aria-label="call to action button to encourage user to support students"
            className="mb-4 mt-8 flex gap-2 justify-center xl:justify-start"
          >
            <BtnPrimary title="Support now" />
            <Button variant="outline" className="">
              <Link href="/">Why us 🤔?</Link>
            </Button>
          </div>
          <Separator className="mt-16 mb-8" />
          {/* partners logos */}

          <div className="flex flex-col items-center gap-4 xl:flex-row xl:gap-8">
            <p className="text-center  text-lg mb-2 xl:text-left text-muted-foreground">
              Partners :
            </p>
            <div className="grid grid-cols-3 gap-4 xl:gap-8">
              {imgSrc.map(({ src, alt }) => (
                <Image
                  src={src}
                  width={150}
                  height={150}
                  alt={alt}
                  quality={75}
                />
              ))}
            </div>
          </div>
        </div>
        <div aria-label="illustration-box" className="flex w-full gap-2">
          <div className="relative w-full">
            <Image
              src="/imgs/hero/hero.webp"
              alt="f"
              layout="responsive"
              width={150}
              height={150}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
