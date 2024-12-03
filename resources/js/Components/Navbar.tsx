import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ThemeToggle } from "@/Components/ThemeToggle";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { UserCircle, LogOut } from "lucide-react";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const userInitials = (name: string | null): string => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // const dashboardRoute =
  //   user?.role === "admin" || user?.role === "super_admin" ? "dashboard" : "home";

  return (
    <nav className="border-b py-4 bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-foreground">
          PSIKOBANK
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* User Logged In */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link href={route('dashboard')}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      {/* <AvatarImage src={user.avatar || ""} alt={user.name || "User Avatar"} /> */}
                      <AvatarFallback className="bg-primary/10">
                        {userInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {/* User Info */}
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name || "User Name"}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  {/* Profile Link */}
                  <DropdownMenuItem asChild>
                    <Link
                      href={route("user.profile")}
                      className="flex w-full cursor-pointer items-center"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  {/* Logout Link */}
                  <DropdownMenuItem asChild>
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="flex w-full cursor-pointer items-center text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // User Not Logged In
            <div className="flex items-center gap-2">
              <Link href={route("login")}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href={route("register")}>
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
