import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCapIcon, BanknoteIcon } from "lucide-react";
import Link from "next/link";
import NewTransactionButton from "./components/NewTransactionButton";

function page({}) {
  const items = [
    {
      icon: <GraduationCapIcon />,
      href: "/admin/money/students",
      title: "students",
    },
    {
      icon: <BanknoteIcon />,
      href: "/admin/money/providers",
      title: "Providers",
    },
    {
      icon: <GraduationCapIcon />,
      href: "/admin/money/unifunds",
      title: "Unifunds",
    },
  ];

  return (
    <>
      <NewTransactionButton />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <Link href={item.href}>
            <Card className="flex flex-col items-center">
              <CardHeader>
                <CardTitle>{item.icon}</CardTitle>
              </CardHeader>
              <CardContent>{item.title}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default page;
