import Hero from "@/components/Hero";
import Conversation from "../components/Conversation";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Conversation />
        <Profile />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
