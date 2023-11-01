import { Loader2 } from "lucide-react";

function SpinnerBtn({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{title} </span>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
}

export default SpinnerBtn;
