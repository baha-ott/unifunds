import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className = "" }: Props) {
  return (
    <div className={cn(`max-w-screen-2xl mx-auto px-8 ${className}`)}>
      {children}
    </div>
  );
}

export default Container;
