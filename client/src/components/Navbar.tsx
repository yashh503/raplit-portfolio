import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollPosition } from "@/lib/hooks";

interface NavbarProps {
  sections: string[];
}

export function Navbar({ sections }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
      closeMobileMenu();
    }
  };

  // Format the section name for display (capitalize first letter)
  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <nav className={`navbar fixed top-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300 ${scrollY > 50 ? "scrolled" : ""}`}>
      <div className="container mx-auto flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold font-montserrat text-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          YV
        </a>
        
        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-foreground focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8">
          {sections.map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                className="text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {formatSectionName(section)}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
      
      {/* Mobile Menu */}
      <div className={`pt-4 pb-2 lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-2 mt-2 px-4">
          {sections.map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {formatSectionName(section)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
