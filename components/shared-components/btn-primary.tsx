import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const BtnPrimary = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return <Button className="bg-brand-primary">{title || children}</Button>;
};

export default BtnPrimary;
