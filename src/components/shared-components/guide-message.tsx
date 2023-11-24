import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { BookIcon } from "lucide-react";

export default function GuideMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Alert variant="default">
      <BookIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
