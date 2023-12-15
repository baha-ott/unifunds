import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCapIcon } from "lucide-react";
import { Form } from "react-hook-form";
import FormSearchForAstudent from "./component/form-search-student";

export default function DashboardPage() {
  const analyticsData = [
    {
      id: 1,
      title: "Total supported students",
      icon: GraduationCapIcon,
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

        <FormSearchForAstudent />
      </div>
    </>
  );
}
