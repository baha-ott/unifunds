/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eEw2JFo9ZIO
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Newsletter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0F7771] dark:bg-[#0F4441]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#EFFFFA] dark:text-[#EAD2CF]">
              Stay Informed, Stay Ahead
            </h2>
            <p className="mx-auto max-w-[700px] text-[#9FC3C2] md:text-xl dark:text-[#B3AFAF]">
              Subscribe to our newsletter to get the latest updates on educational trends, tips and opportunities.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your student email" type="email" />
              <Button className="bg-[#0F4441] text-[#EFFFFA]" type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-[#9FC3C2] dark:text-[#B3AFAF]">
              By subscribing, you agree to our
              <Link className="underline underline-offset-2 text-[#EFFFFA] dark:text-[#EAD2CF]" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

