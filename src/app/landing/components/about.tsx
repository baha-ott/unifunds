import Container from "@/components/layout/container";
import { TypographyP } from "@/components/shared-components/typography/typographyP";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanknoteIcon, PlaneIcon, SproutIcon } from "lucide-react";

function About({}) {
  const cards = [
    {
      icon: <BanknoteIcon className="text-brand-primary" />,
      title: "Money",
      description: "Grow with us ",
    },
    {
      icon: <PlaneIcon className="text-brand-primary" />,
      title: "Exchange",
      description: "Study world wide",
      primary: true,
    },
    {
      icon: <SproutIcon className="text-brand-primary" />,
      title: "Grow",
      description: "Grow and live new experience",
    },
  ];
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col items-center " role="text box">
          <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
            The <span className="text-brand-primary">benifits</span> that will
            get
          </h2>
          <TypographyP
            title="Have the opportunity to go to school or college without thinking about the cost? just focus on studying and assignment given"
            className="leading-7 text-center  mt-0 md:w-1/2"
          />
       
        </div>

        <div role="box" className="flex flex-col md:flex-row gap-4 mt-16">
          {cards.map((c) => (
            <Card className={`w-full ${c.primary ? "bg-brand-primary" : ""}`}>
              <CardHeader>
                <CardTitle>
                  <span
                    className={`${
                      c.primary
                        ? "bg-white bg-opacity-100"
                        : "bg-brand-primary bg-opacity-20"
                    }  w-16 h-16 rounded-full flex items-center justify-center`}
                  >
                    {c.icon}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className={`mb-2 ${c.primary ? "text-white" : ""}`}>
                  {c.title}
                </CardTitle>
                <p className={`${c.primary ? "text-gray-300":  "text-muted-foreground"}`}>{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default About;
