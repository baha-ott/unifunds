import { cn } from "@/lib/utils";

export default function TypographyH2({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0`,
        className
      )}
    >
      {title}
    </h2>
  );
}
