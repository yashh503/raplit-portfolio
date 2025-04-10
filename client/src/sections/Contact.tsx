import { useRef, useEffect, useState } from "react";
import { useInView } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";

export function Contact() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      timeline
        .fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          formRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          infoRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.6"
        );
    }
  }, [isInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be connected to a backend
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting me. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h2 
          ref={headerRef}
          className="text-3xl md:text-4xl font-bold mb-4 text-center font-montserrat text-foreground"
        >
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p 
          ref={descriptionRef}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div ref={formRef} className="bg-card rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-card-foreground">Send Me a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground mb-1">Email</h4>
                  <a 
                    href="mailto:yash.vyas@example.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    yash.vyas@example.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-muted hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-muted-foreground"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-muted hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-muted-foreground"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
                <a 
                  href="mailto:yash.vyas@example.com" 
                  className="bg-muted hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-muted-foreground"
                >
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
            
            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Current Status</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                <p className="text-muted-foreground">
                  Available for freelance work and new opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
