import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const BtnPrimary = ({
  title,
  children,
  className,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button className={cn(`bg-brand-primary ${className || ""}`)}>
      {title || children}
      {/* short circiting */}
    </Button>
  );
};

export default BtnPrimary;
