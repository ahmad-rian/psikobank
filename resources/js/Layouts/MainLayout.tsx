import * as React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Head } from "@inertiajs/react"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head title="PSIKOBANK" />
      <div className="relative flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div
          className={cn(
            "hidden md:block fixed inset-y-0 z-30",
            isCollapsed ? "w-16" : "w-64",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <Sidebar
            className="h-full border-r transition-all duration-300"
            isCollapsed={isCollapsed}
            onCollapsedChange={setIsCollapsed}
          />
        </div>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40 md:hidden hover:bg-accent"
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

        {/* Main Content */}
        <div className={cn(
          "flex-1",
          isCollapsed ? "md:pl-16" : "md:pl-64",
          "transition-all duration-300"
        )}>
          {/* Top Bar */}
          <header className={cn(
            "sticky top-0 z-20 border-b",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            scrolled && "shadow-sm"
          )}>
            <div className="container flex h-16 items-center gap-4 px-4">
              <div className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="mr-2"
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-end gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="container px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}