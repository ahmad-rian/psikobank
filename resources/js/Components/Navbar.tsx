// resources/js/Components/Navbar.tsx
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ThemeToggle } from "@/Components/ThemeToggle";
import { User } from "@/types";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="border-b py-4 bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-foreground">
          PSIKOBANK
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href={route('dashboard')}>
              <Button variant="ghost">Dashboard</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={route('login')}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href={route('register')}>
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}