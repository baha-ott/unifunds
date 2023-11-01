import { cn } from "@/lib/utils";

const TypographyH1 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${
          className ? className : ""
        }`
      )}
    >
      {title}
    </h1>
  );
};

export default TypographyH1;
