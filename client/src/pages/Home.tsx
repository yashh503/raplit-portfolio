import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const sections = ["home", "about", "projects", "skills", "contact"];

  useEffect(() => {
    // Set page title
    document.title = "Yash Vyas | MERN Stack Developer";
    
    // Smooth scroll behavior for the whole page
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Clean up on unmount
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ThreeBackground />
      <Navbar sections={sections} />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
