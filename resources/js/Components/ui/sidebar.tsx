import * as React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/Components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible"

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

// Types and Interfaces
interface User {
  name: string
  email: string
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavigationItem {
  title: string
  href: string
  icon: React.ReactNode
  description?: string
}

interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

// Navigation Configuration
const navigationConfig = {
  overview: {
    title: "Overview",
    href: "dashboard",
    icon: <Home className="h-4 w-4" />,
    description: "Dashboard & Analytics"
  } as NavigationItem,
  groups: [
    {
      title: "Management",
      items: [
        { title: "Users", href: "dashboard", icon: <Users className="h-4 w-4" /> },
        { title: "Reports", href: "dashboard", icon: <FileText className="h-4 w-4" /> },
        { title: "Analytics", href: "dashboard", icon: <PieChart className="h-4 w-4" /> }
      ]
    },
    {
      title: "Learning",
      items: [
        { title: "Courses", href: "dashboard", icon: <BookOpen className="h-4 w-4" /> },
        { title: "Assessments", href: "dashboard", icon: <GraduationCap className="h-4 w-4" /> }
      ]
    }
  ] as NavigationGroup[]
}

// Logo Component
const Logo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <>
    {!collapsed ? (
      <Link href={route('dashboard')} className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-md">
          P
        </span>
        <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          PSIKOBANK
        </span>
      </Link>
    ) : (
      <Link href={route('dashboard')} className="w-full flex justify-center">
        <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-md">
          P
        </span>
      </Link>
    )}
  </>
)

// User Menu Component
const UserMenu = ({ user, onClose, handleLogout, isCollapsed = false }: { 
  user: User
  handleLogout: () => void
  onClose?: () => void
  isCollapsed?: boolean
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full gap-3 h-auto px-2",
          isCollapsed ? "justify-center" : "justify-start"
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
        <Link 
          href={route('profile.edit')} 
          className="cursor-pointer"
          onClick={onClose}
        >
          <Settings className="w-4 h-4 mr-2" />
          Profile Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem 
        onClick={() => {
          onClose?.()
          handleLogout()
        }}
        className="text-destructive focus:text-destructive cursor-pointer"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

// Navigation Items Components
const DesktopNavigationItem = ({ item, isCollapsed }: { 
  item: NavigationItem
  isCollapsed: boolean 
}) => {
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={route(item.href)}
            className={cn(
              "flex h-10 items-center justify-center rounded-md",
              "hover:bg-accent hover:text-accent-foreground",
              route().current(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.icon}
            <span className="sr-only">{item.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Link
      href={route(item.href)}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2",
        "hover:bg-accent hover:text-accent-foreground",
        route().current(item.href)
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground"
      )}
    >
      {item.icon}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{item.title}</span>
        {item.description && (
          <span className="text-xs text-muted-foreground">{item.description}</span>
        )}
      </div>
    </Link>
  )
}

const MobileNavigationItem = ({ item, onClose }: { 
  item: NavigationItem
  onClose: () => void 
}) => (
  <Link
    href={route(item.href)}
    onClick={onClose}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2",
      "transition-colors",
      route().current(item.href)
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted"
    )}
  >
    {item.icon}
    <div>
      <div className="text-sm font-medium">{item.title}</div>
      {item.description && (
        <div className="text-xs text-muted-foreground">{item.description}</div>
      )}
    </div>
  </Link>
)

// Navigation Groups Components
const DesktopNavigationGroup = ({ 
  group, 
  isCollapsed, 
  isOpen, 
  onToggle 
}: { 
  group: NavigationGroup
  isCollapsed: boolean
  isOpen: boolean
  onToggle: () => void
}) => {
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-center p-2"
          >
            {group.items[0].icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{group.title}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between px-3 py-2 h-9",
            isOpen && "font-medium"
          )}
        >
          <div className="flex items-center gap-2">
            {group.items[0].icon}
            <span className="text-sm">{group.title}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-3 py-2">
        {group.items.map((item) => (
          <Link
            key={item.title}
            href={route(item.href)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

const MobileNavigationGroup = ({ group, onClose }: { 
  group: NavigationGroup
  onClose: () => void 
}) => (
  <div className="px-3">
    <div className="flex items-center justify-between px-3 py-2">
      <div className="text-xs font-medium uppercase text-muted-foreground">
        {group.title}
      </div>
    </div>
    <div className="space-y-1">
      {group.items.map((item) => (
        <Link
          key={item.title}
          href={route(item.href)}
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
        >
          {item.icon}
          <span className="text-sm">{item.title}</span>
        </Link>
      ))}
    </div>
  </div>
)

// Main Sidebar Component
export function Sidebar({ className }: SidebarProps) {
  const { auth } = usePage().props as any
  const user = auth.user as User
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [openGroups, setOpenGroups] = React.useState<string[]>(['management', 'learning'])
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

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

  const renderNavigation = (isMobile = false) => (
    <div className="space-y-4 py-4">
      {/* Overview */}
      <div className={cn(isMobile ? "px-3" : "px-2")}>
        {isMobile ? (
          <MobileNavigationItem 
            item={navigationConfig.overview} 
            onClose={() => setIsMobileOpen(false)} 
          />
        ) : (
          <DesktopNavigationItem 
            item={navigationConfig.overview}
            isCollapsed={isCollapsed}
          />
        )}
      </div>

      {/* Groups */}
      {navigationConfig.groups.map((group) => (
        isMobile ? (
          <MobileNavigationGroup
            key={group.title}
            group={group}
            onClose={() => setIsMobileOpen(false)}
          />
        ) : (
          <DesktopNavigationGroup
            key={group.title}
            group={group}
            isCollapsed={isCollapsed}
            isOpen={openGroups.includes(group.title.toLowerCase())}
            onToggle={() => toggleGroup(group.title.toLowerCase())}
          />
        )
      ))}
    </div>)

return (
  <>
    {/* Desktop Sidebar */}
    <div 
      className={cn(
        "hidden lg:flex relative flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b bg-background/95 px-4">
        <Logo collapsed={isCollapsed} />
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

      {/* Navigation */}
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-2">
          <TooltipProvider delayDuration={0}>
            {renderNavigation()}
          </TooltipProvider>
        </nav>
      </div>

      {/* User Profile */}
      <div className="sticky bottom-0 border-t bg-background/95 p-4">
        <UserMenu 
          user={user} 
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>

    {/* Mobile Menu Button */}
    <Button 
      variant="ghost" 
      size="icon"
      className="lg:hidden fixed top-4 left-4 z-40 hover:bg-accent"
      onClick={() => setIsMobileOpen(true)}
    >
      <Menu className="h-5 w-5" />
    </Button>

    {/* Mobile Sidebar */}
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetContent side="left" className="p-0 w-screen max-w-[300px]">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-14 flex items-center px-4 border-b">
            <div className="flex items-center gap-2 flex-1">
              <span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold">
                P
              </span>
              <span className="font-semibold text-lg">PSIKOBANK</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto">
            {renderNavigation(true)}
          </div>

          {/* User Profile */}
          <div className="border-t p-4">
            <UserMenu 
              user={user} 
              handleLogout={handleLogout} 
              onClose={() => setIsMobileOpen(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </>
)
}