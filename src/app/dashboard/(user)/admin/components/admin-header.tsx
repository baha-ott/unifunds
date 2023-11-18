import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Adminheader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
      <Link className="lg:hidden" href="#">
        <svg
          className=" h-6 w-6"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <svg
              className=" absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-zinc-950"
              placeholder="Search users..."
              type="search"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
