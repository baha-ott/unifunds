import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanknoteIcon, PersonStandingIcon } from "lucide-react";

export default function () {
  const analyticsData = [
    {
      id: 1,
      title: "Total supported students",
      icon: BanknoteIcon,
      result: "$45.231",
    },
  ];
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {analyticsData.map((a) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {a.title}{" "}
                </CardTitle>
                <a.icon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{a.result}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
