import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Header />
      <Services />
      <About />
      <Footer />
    </main>
  )
}
