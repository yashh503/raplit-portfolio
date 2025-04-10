import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  // Use a default theme to prevent error during first render
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const { theme, toggleTheme } = useTheme();

  // After mounting, we can safely show the theme toggle and use the actual theme
  useEffect(() => {
    setMounted(true);
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    >
      {currentTheme === "dark" ? (
        <i className="fas fa-sun text-lg"></i>
      ) : (
        <i className="fas fa-moon text-lg"></i>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
