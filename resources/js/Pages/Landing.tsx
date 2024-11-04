import * as React from "react";
import { Link, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import Navbar from "@/Components/Navbar";
import { User } from "@/types";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Star, Target, Book, Brain, Trophy, Send, ChevronUp } from "lucide-react";

// Jump to Top Component
const JumpToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronUp className="w-6 h-6" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Custom hook untuk animasi counter
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);
  const inView = useInView(nodeRef);
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      let startTime = 0;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(end * percentage));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, inView]);

  return { count, ref: nodeRef };
};

// Komponen untuk menampilkan angka dengan format
const AnimatedNumber = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const endValue = parseInt(value.replace(/\D/g, ""));
  const { count, ref } = useCounter(endValue);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-primary"
    >
      {count.toLocaleString()}{suffix}
    </motion.div>
  );
};

// Data constants
const stats = [
  { value: "10000", label: "Soal Latihan", suffix: "+" },
  { value: "50000", label: "Pengguna Aktif", suffix: "+" },
  { value: "95", label: "Tingkat Kelulusan", suffix: "%" },
  { value: "4.8", label: "Rating Pengguna", suffix: "/5" },
];

const features = [
  {
    icon: <Book className="w-6 h-6 text-primary" />,
    title: "Bank Soal Lengkap",
    description: "Akses ribuan soal psikotes dari berbagai kategori dan tingkat kesulitan.",
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Analisis Performa",
    description: "Pantau perkembangan belajar dengan analisis detail dan rekomendasi personalisasi.",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Simulasi Ujian",
    description: "Rasakan pengalaman ujian psikotes yang sesungguhnya dengan fitur simulasi kami.",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    description: "Untuk pemula yang ingin mencoba",
    price: "99.000",
    duration: "bulan",
    features: [
      "Akses 1000+ soal latihan",
      "5 simulasi ujian",
      "Analisis performa dasar",
      "Forum diskusi",
    ],
    featured: false,
  },
  {
    name: "Pro",
    description: "Untuk persiapan maksimal",
    price: "199.000",
    duration: "bulan",
    features: [
      "Akses semua soal latihan",
      "Simulasi ujian unlimited",
      "Analisis performa lengkap",
      "Konsultasi online",
      "Video pembelajaran",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Untuk institusi & kelompok",
    price: "Custom",
    duration: "tahun",
    features: [
      "Semua fitur Pro",
      "Dashboard admin",
      "Laporan analitik kelompok",
      "API integration",
      "Dukungan prioritas",
    ],
    featured: false,
  },
];

export default function Landing({ auth }: { auth: { user: User | null } }) {
    const user = auth.user;
    const [email, setEmail] = React.useState("");
  
    const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      setEmail("");
      alert("Terima kasih telah berlangganan!");
    };
  
    return (
      <>
        <Head title="PSIKOBANK - Platform Pembelajaran Psikotes #1 di Indonesia" />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
          <Navbar user={user} />
          
          {/* Jump to Top Button */}
          <JumpToTop />
  
          {/* Hero Section */}
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Badge variant="secondary" className="mb-4">
                  🎉 Promo Spesial - Hemat 50% untuk 100 Pendaftar Pertama
                </Badge>
                <motion.h1 
                  className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  Raih Mimpimu Bersama PSIKOBANK
                </motion.h1>
                <motion.p 
                  className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Platform pembelajaran psikotes online terlengkap untuk persiapan masuk universitas, 
                  beasiswa, dan karir impianmu. Dengan lebih dari 10,000+ soal dan materi berkualitas.
                </motion.p>
                <motion.div 
                  className="mt-10 flex items-center justify-center gap-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {!user ? (
                    <Link href={route('register')}>
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Mulai Belajar Sekarang
                      </Button>
                    </Link>
                  ) : (
                    <Link href={route('dashboard')}>
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Akses Dashboard
                      </Button>
                    </Link>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg">
                        Lihat Demo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Demo PSIKOBANK</DialogTitle>
                        <DialogDescription>
                          Video demo penggunaan platform akan ditampilkan di sini
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </motion.div>
            </div>
          </section>
  
          {/* Stats Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {stat.label}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-4xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Fitur Unggulan
              </motion.h2>
              <motion.p 
                className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Tingkatkan peluang keberhasilanmu dengan fitur-fitur terbaik dari PSIKOBANK
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <motion.div 
                          className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        <CardDescription className="text-lg">{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-4xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Paket Berlangganan
              </motion.h2>
              <motion.p 
                className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Pilih paket yang sesuai dengan kebutuhanmu
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className={`h-full ${plan.featured ? 'border-primary shadow-lg' : ''}`}>
                    <CardHeader>
                      {plan.featured && (
                        <Badge className="w-fit mb-4">Paling Populer</Badge>
                      )}
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-lg">{plan.description}</CardDescription>
                      <motion.div 
                        className="mt-4"
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1 }}
                      >
                        <span className="text-4xl font-bold">Rp {plan.price}</span>
                        <span className="text-muted-foreground">/{plan.duration}</span>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mr-2" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        className="w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                          Pilih Paket
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Dapatkan Info Terbaru
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Berlangganan newsletter kami untuk mendapatkan tips, artikel, dan promo menarik
              </motion.p>
              <motion.form 
                onSubmit={handleSubscribe} 
                className="flex gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    Langganan
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="font-bold">PSIKOBANK</h3>
                <p className="text-muted-foreground">
                  Platform pembelajaran psikotes online terpercaya di Indonesia
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>

              {[
                {
                  title: "Produk",
                  links: ["Bank Soal", "Try Out", "Konsultasi"]
                },
                {
                  title: "Perusahaan",
                  links: ["Tentang Kami", "Karir", "Blog"]
                },
                {
                  title: "Bantuan",
                  links: ["FAQ", "Hubungi Kami", "Kebijakan Privasi"]
                }
              ].map((column, columnIndex) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                >
                  <h3 className="font-bold mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: linkIndex * 0.1 }}
                      >
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12 pt-8 border-t text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p>© 2024 PSIKOBANK. Hak Cipta Dilindungi.</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}