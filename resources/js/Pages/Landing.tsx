// resources/js/Pages/Landing.tsx
import * as React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/Components/Navbar";
import { User } from "@/types";

interface Props {
  auth: {
    user: User | null;
  };
}

export default function Landing({ auth }: Props) {
  const user = auth.user;

  return (
    
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to PSIKOBANK
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your trusted platform for psychological assessments and management.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!user ? (
                <Link href={route('register')}>
                  <Button size="lg">Get Started</Button>
                </Link>
              ) : (
                <Link href={route('dashboard')}>
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              )}
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 PSIKOBANK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Feature 1",
    description: "Description for feature 1",
  },
  {
    title: "Feature 2",
    description: "Description for feature 2",
  },
  {
    title: "Feature 3",
    description: "Description for feature 3",
  },
];