import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props extends ComponentPropsWithoutRef<"button"> {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const BtnPrimary = ({
  title,
  children,
  className,
  type = "button",
  ...props
}: Props) => {
  return (
    <Button
      className={cn(
        `bg-brand-primary ${
          className || ""
        } dark:bg-[#4CAF50] dark:text-[#fff] dark:hover:opacity-90 transition-all`
      )}
      type={type}
      {...props}
    >
      {title || children}
      {/* short circiting */}
    </Button>
  );
};

export default BtnPrimary;
