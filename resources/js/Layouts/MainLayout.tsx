import * as React from "react";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Head } from "@inertiajs/react"; // Pastikan untuk mengimpor Head

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head title="PSIKOBANK" /> 
      <div className="relative min-h-screen flex bg-muted/40">
        {/* Desktop Sidebar with Toggle Button Wrapper */}
        <div
          className={cn(
            "hidden md:block fixed inset-y-0 z-30",
            isCollapsed ? "w-16" : "w-64",
            "transition-all duration-300 ease-in-out"
          )}
        >
          {/* Toggle Button Container */}
          <div 
            className={cn(
              "absolute z-50",
              "transition-all duration-300 ease-in-out",
              isCollapsed ? "right-0 translate-x-1/2" : "-right-3"
            )}
            style={{ top: "1.5rem" }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "h-6 w-6 rounded-full",
                "bg-background border shadow-sm hover:bg-accent",
                "transition-all duration-300 ease-in-out",
                isCollapsed && "-rotate-180"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar Container */}
          <div className="h-full">
            <Sidebar
              className="h-full rounded-r-xl border-r shadow-lg overflow-hidden"
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-64 p-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Sidebar isSheet />
          </SheetContent>
        </Sheet>

        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 min-h-screen",
            isCollapsed ? "md:pl-16" : "md:pl-64",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="container max-w-6xl p-6 pt-16 md:pt-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}