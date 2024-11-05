import * as React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { 
  User, 
  LogOut, 
  Home,
  Users,
  FileText,
  PieChart,
  BookOpen,
  GraduationCap,
  Settings,
  ChevronDown,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"

interface User {
  name: string
  email: string
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { auth } = usePage().props as any
  const user = auth.user as User
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [openGroups, setOpenGroups] = React.useState<string[]>(['management', 'learning'])
  const [open, setOpen] = React.useState(false)

  const handleLogout = () => {
    router.post(route('logout'))
  }

  const toggleGroup = (group: string) => {
    setOpenGroups(current => 
      current.includes(group)
        ? current.filter(item => item !== group)
        : [...current, group]
    )
  }

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div 
      className={cn(
        "hidden lg:flex relative flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300",
        className
      )}
    >
      {/* Header/Logo Section */}
      <div className="flex h-16 items-center border-b bg-background/95 px-4">
        {!isCollapsed && (
          <Link href={route('dashboard')} className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-md">
              P
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PSIKOBANK
            </span>
          </Link>
        )}
        {isCollapsed && (
          <Link href={route('dashboard')} className="w-full flex justify-center">
            <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-md">
              P
            </span>
          </Link>
        )}
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 h-8 w-8 rounded-full border bg-background hidden lg:flex"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>

      {/* Navigation Section */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-2 px-2">
          <TooltipProvider delayDuration={0}>
            {/* Overview Item */}
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={route("dashboard")}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-md",
                      "hover:bg-accent hover:text-accent-foreground",
                      route().current("dashboard")
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Overview</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Overview</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href={route("dashboard")}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2",
                  "hover:bg-accent hover:text-accent-foreground",
                  route().current("dashboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Home className="h-4 w-4" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Overview</span>
                  <span className="text-xs text-muted-foreground">Dashboard & Analytics</span>
                </div>
              </Link>
            )}

            {/* Management Section */}
            {!isCollapsed && (
              <Collapsible
                open={openGroups.includes('management')}
                onOpenChange={() => toggleGroup('management')}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between px-3 py-2 h-9",
                      openGroups.includes('management') && "font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Management</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroups.includes('management') && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 px-3 py-2">
                  <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </Link>
                  <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileText className="h-4 w-4" />
                    Reports
                  </Link>
                  <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <PieChart className="h-4 w-4" />
                    Analytics
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            )}
            {isCollapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center p-2"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Management</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Learning Section */}
            {!isCollapsed && (
              <Collapsible
                open={openGroups.includes('learning')}
                onOpenChange={() => toggleGroup('learning')}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between px-3 py-2 h-9",
                      openGroups.includes('learning') && "font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">Learning</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroups.includes('learning') && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 px-3 py-2">
                  <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <BookOpen className="h-4 w-4" />
                    Courses
                  </Link>
                  <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <GraduationCap className="h-4 w-4" />
                    Assessments
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            )}
            {isCollapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center p-2"
                  >
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Learning</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="sticky bottom-0 border-t bg-background/95 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3 h-auto px-2",
                isCollapsed && "justify-center"
              )}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 grid place-items-center">
                <User className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem asChild>
              <Link href={route('profile.edit')} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Version */}
      <DesktopSidebar />

      {/* Mobile Version */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-screen max-w-[300px]">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="h-14 flex items-center px-4 border-b">
                <div className="flex items-center gap-2 flex-1">
                  <span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold">
                    P
                  </span>
                  <span className="font-semibold text-lg">
                    PSIKOBANK
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-auto">
                <div className="space-y-4 py-4">
                  {/* Overview Section */}
                  <div className="px-3">
                    <Link
                      href={route('dashboard')}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2",
                        "transition-colors",
                        route().current('dashboard') 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <Home className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">Overview</div>
                        <div className="text-xs text-muted-foreground">Dashboard & Analytics</div>
                      </div>
                    </Link>
                  </div>

                  {/* Management Section */}
                  <div className="px-3">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="text-xs font-medium uppercase text-muted-foreground">
                        Management
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={route('dashboard')}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      >
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Users</span>
                      </Link>
                      <Link
                        href={route('dashboard')}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Reports</span>
                      </Link>
                      <Link
                        href={route('dashboard')}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      >
                        <PieChart className="h-4 w-4" />
                        <span className="text-sm">Analytics</span>
                      </Link>
                    </div>
                  </div>

                  {/* Learning Section */}
                  <div className="px-3">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="text-xs font-medium uppercase text-muted-foreground">
                        Learning
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={route('dashboard')}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Courses</span>
                      </Link>
                      <Link
                        href={route('dashboard')}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-sm">Assessments</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="border-t p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 grid place-items-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuItem asChild>
                      <Link 
                        href={route('profile.edit')} 
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}