import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Rocket, Video, BarChart } from "lucide-react";
import type { User } from "@/types";

interface HeroProps {
  user: User | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4">
            🎉 Flash Sale - Hemat 70% untuk 50 Pendaftar Pertama
          </Badge>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Siapkan Masa Depanmu
            <br />
            Bersama PSIKOBANK
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Platform persiapan psikotes #1 di Indonesia dengan 15,000+ soal,
            analisis AI, dan bimbingan psikolog profesional
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {!user ? (
              <Link href={route('register')}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Rocket className="mr-2 h-5 w-5" />
                  Mulai Trial Gratis
                </Button>
              </Link>
            ) : (
              <Link href={route('dashboard')}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <BarChart className="mr-2 h-5 w-5" />
                  Lihat Dashboard
                </Button>
              </Link>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Video className="mr-2 h-5 w-5" />
                  Lihat Demo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Demo PSIKOBANK</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-muted rounded-lg">
                  {/* Video content placeholder */}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}