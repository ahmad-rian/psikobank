// sidebar.tsx
import * as React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  name: string;
  email: string;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  isSheet?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isCollapsed,
  isSheet = false
}) => {
  const { auth } = usePage().props as any;
  const user = auth.user as User;

  // Fungsi untuk handle logout
  const handleLogout = () => {
    router.post(route('logout'), {}, {
      onSuccess: () => {
        // window.location.href = route('login');
      },
    });
  };

  const menuItems = [
    { href: route("dashboard"), label: "Dashboard", icon: LayoutDashboard },
  ];

  const renderProfileDropdown = () => (
    <DropdownMenuContent align="end" className="w-[200px]" sideOffset={5}>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={route('profile.edit')} className="cursor-pointer">
          <User  className="w-4 h-4 mr-2" />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={handleLogout}
        className="text-destructive focus:text-destructive cursor-pointer"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <TooltipProvider delayDuration={0}>
      <div className={cn(
        "flex h-full flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
        <div className="flex h-[60px] items-center border-b px-6">
          {(!isCollapsed || isSheet) && (
            <Link href={route('dashboard')} className="flex items-center gap-2 font-semibold">
              <span className="h-6 w-6 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold">P</span>
              <span className="text-lg">PSIKOBANK</span>
            </Link>
          )}
          {(isCollapsed && !isSheet) && (
            <Link href={route('dashboard')} className="flex items-center">
              <span className="h-6 w-6 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm font-bold">P</span>
            </Link>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <nav className="grid gap-1 px-2 py-3">
            {menuItems.map((item) => (
              isCollapsed && !isSheet ? (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-md",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        route().current(item.href.split(".")[0] + "*")
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    route().current(item.href .split(".")[0] + "*")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            ))}
          </nav>
        </div>

        <div className={cn(
          "sticky bottom-0 mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "p-3",
          isCollapsed && !isSheet ? "px-2" : "px-3"
        )}>
          {isCollapsed && !isSheet ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  {renderProfileDropdown()}
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">Account Menu</TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 grid place-items-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              {renderProfileDropdown()}
            </DropdownMenu>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};