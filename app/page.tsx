import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";
import WhyChooseUs from "./components/WhyChooseUs";
import Info from "./components/Info";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Stats />
        <WhyChooseUs />
        <Info />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
