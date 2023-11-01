import { cn } from "@/lib/utils";

export function TypographyP({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        `leading-7 text-muted-foreground [&:not(:first-child)]:mt-6 ${
          className || ""
        }`
      )}
    >
      {title}
    </p>
  );
}
