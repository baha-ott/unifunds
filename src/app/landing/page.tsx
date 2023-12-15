import Hero from "@/components/pages/landing/hero/hero";
import About from "./components/about";
import Programs from "./components/programms";
import HowToApply from "./components/how-apply";
import ContactUs from "./components/contact-us";
import Footer from "./components/footer";
import Newsletter from "./components/newsletter";
import Gallery from "./components/gallery";
import Partners from "./components/partnets";

export default async function Landing() {
  return (
    <main>
      <Hero />
      <Partners />
      <About />
      <Programs />
      <HowToApply />
      <Gallery />
      <Newsletter />
      <Footer />
    </main>
  );
}
