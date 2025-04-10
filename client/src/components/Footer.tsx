export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold font-montserrat text-primary">YV</a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Yash Vyas. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Designed & Built with <i className="fas fa-heart text-red-500"></i>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
