import * as React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Head } from "@inertiajs/react"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
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
        {/* Sidebar Component */}
        <Sidebar className="fixed inset-y-0 z-30" />

        {/* Main Content */}
        <div className="flex-1 lg:pl-64 transition-all duration-300">
          {/* Top Bar */}
          <header className={cn(
            "sticky top-0 z-20 border-b",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            scrolled && "shadow-sm"
          )}>
            <div className="container flex h-16 items-center gap-4 px-4">
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