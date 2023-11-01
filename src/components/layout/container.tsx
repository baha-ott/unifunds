import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode
  className?: string;
}

function Container({ children, className = "" }: Props) {
  return (
    <div className={cn(`max-w-screen-2xl mx-auto px-4 lg:px-12 ${className}`)}>
      {children}
    </div>
  );
}

export default Container;
