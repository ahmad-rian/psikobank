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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import Navbar from "@/Components/Navbar";
import { User } from "@/types";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Star, 
  Target, 
  Book, 
  Brain, 
  Trophy,
  Send,
  ChevronUp,
  Rocket,
  Users,
  Clock,
  Calendar,
  BookOpen,
  Heart,
  Award,
  BarChart,
  Video,
  MessageSquare,
  Loader,
  Shield,
  Zap
} from "lucide-react";

// Custom hook untuk animasi counter
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);
  const inView = useInView(nodeRef);

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

// Komponen AnimatedNumber
const AnimatedNumber = ({ 
  value, 
  suffix = "" 
}: { 
  value: string; 
  suffix?: string; 
}) => {
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

// Enhanced statistics data
const stats = [
  { value: "15000", label: "Soal Latihan", suffix: "+", icon: <BookOpen className="w-6 h-6 text-primary" /> },
  { value: "75000", label: "Pengguna Aktif", suffix: "+", icon: <Users className="w-6 h-6 text-primary" /> },
  { value: "98", label: "Tingkat Kelulusan", suffix: "%", icon: <Award className="w-6 h-6 text-primary" /> },
  { value: "4.9", label: "Rating Pengguna", suffix: "/5", icon: <Star className="w-6 h-6 text-primary" /> },
];

// Enhanced features data
const features = [
  {
    icon: <Book className="w-6 h-6 text-primary" />,
    title: "Bank Soal Komprehensif",
    description: "15,000+ soal psikotes terverifikasi dari berbagai kategori dan tingkat kesulitan.",
    benefits: ["Soal DISC", "Soal MBTI", "Soal Kepribadian", "Soal Logika"]
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI-Powered Analytics",
    description: "Analisis performa berbasis AI dengan rekomendasi pembelajaran personal.",
    benefits: ["Prediksi Hasil", "Pola Jawaban", "Rekomendasi Belajar", "Progress Tracking"]
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Simulasi Ujian Real-Time",
    description: "Pengalaman ujian yang realistis dengan timer dan kondisi sesungguhnya.",
    benefits: ["Timer Otomatis", "Feedback Instan", "Review Detail", "Statistik Performa"]
  },
  {
    icon: <Video className="w-6 h-6 text-primary" />,
    title: "Video Pembelajaran",
    description: "Tutorial dan pembahasan soal dari para ahli psikologi.",
    benefits: ["Live Session", "Rekaman Workshop", "Tips & Trik", "Studi Kasus"]
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    title: "Konsultasi Psikolog",
    description: "Akses ke psikolog profesional untuk konsultasi pribadi.",
    benefits: ["Chat 24/7", "Video Call", "Grup Diskusi", "Feedback Personal"]
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Jaminan Kelulusan",
    description: "Program khusus dengan jaminan uang kembali jika tidak lulus.",
    benefits: ["Money Back Guarantee", "Extended Access", "Priority Support", "Free Retake"]
  },
];

// Enhanced pricing plans
const pricingPlans = [
  {
    name: "Starter",
    description: "Untuk pemula yang ingin mencoba",
    price: "99.000",
    duration: "bulan",
    features: [
      "Akses 2000+ soal latihan",
      "10 simulasi ujian",
      "Analisis performa dasar",
      "Forum diskusi",
      "Video pembelajaran basic",
      "Email support"
    ],
    featured: false,
    tag: "POPULER"
  },
  {
    name: "Pro",
    description: "Persiapan maksimal untuk kesuksesan",
    price: "249.000",
    duration: "bulan",
    features: [
      "Akses semua soal latihan",
      "Simulasi ujian unlimited",
      "AI-powered analytics",
      "Konsultasi psikolog (2x)",
      "Video pembelajaran lengkap",
      "Priority support 24/7",
      "Mock interview",
      "Sertifikat kelulusan"
    ],
    featured: true,
    tag: "BEST SELLER"
  },
  {
    name: "Enterprise",
    description: "Solusi untuk institusi & kelompok",
    price: "Custom",
    duration: "tahun",
    features: [
      "Semua fitur Pro+",
      "Dashboard admin khusus",
      "Analitik kelompok",
      "White label solution",
      "API integration",
      "Dedicated support",
      "Custom reporting",
      "Training for trainers"
    ],
    featured: false,
    tag: "CORPORATE"
  },
];

// Success stories data
const successStories = [
  {
    name: "Ahmad Rizki",
    role: "Diterima di Google Indonesia",
    image: "/api/placeholder/100/100",
    testimony: "PsikoBank membantu saya mempersiapkan tes psikologi dengan sangat baik. Materinya lengkap dan up-to-date.",
    rating: 5
  },
  {
    name: "Sarah Putri",
    role: "Penerima Beasiswa LPDP",
    image: "/api/placeholder/100/100",
    testimony: "Platform yang sangat membantu dalam persiapan tes LPDP. Sistem AI-nya memberikan rekomendasi yang tepat sasaran.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager di Tokopedia",
    image: "/api/placeholder/100/100",
    testimony: "Konsultasi dengan psikolog sangat membantu dalam mempersiapkan interview. Highly recommended!",
    rating: 5
  }
];

// Study paths data
const studyPaths = [
  {
    title: "Persiapan CPNS",
    duration: "3 bulan",
    modules: 24,
    progress: 0,
  },
  {
    title: "Beasiswa LPDP",
    duration: "2 bulan",
    modules: 18,
    progress: 0,
  },
  {
    title: "Rekrutmen BUMN",
    duration: "2.5 bulan",
    modules: 20,
    progress: 0,
  },
  {
    title: "Perusahaan Multinational",
    duration: "2 bulan",
    modules: 16,
    progress: 0,
  }
];

// Achievements component
const Achievements = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: <Trophy />, value: "250+", label: "Perusahaan Partner" },
        { icon: <Award />, value: "95%", label: "Tingkat Kepuasan" },
        { icon: <Users />, value: "50K+", label: "Alumni Sukses" },
        { icon: <Star />, value: "4.9/5", label: "Rating Google" }
      ].map((achievement, index) => (
        <motion.div
          key={index}
          className="text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-center text-primary mb-2">
            {achievement.icon}
          </div>
          <div className="text-2xl font-bold">{achievement.value}</div>
          <div className="text-sm text-muted-foreground">{achievement.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

interface StudyPath {
  title: string;
  duration: string;
  modules: number;
  progress: number;
}


// Study path card component
const StudyPathCard = ({ path }: { path: StudyPath }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="text-lg">{path?.title || "Judul Tidak Tersedia"}</CardTitle>
      <CardDescription>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {path?.duration || "Durasi Tidak Diketahui"}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <BookOpen className="w-4 h-4" />
          {path?.modules || 0} Modul
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Progress value={path?.progress || 0} className="h-2" />
      <p className="text-sm text-muted-foreground mt-2">
        0/{path?.modules || 0} modul selesai
      </p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Mulai Belajar</Button>
    </CardFooter>
  </Card>
);

interface Testimonial {
  name: string;
  role: string;
  image: string;
  testimony: string;
  rating: number;
}

// Testimonial card component
const TestimonialCard = ({ story }: { story: Testimonial }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center gap-4">
        <img
          src={story?.image || "/placeholder-image.jpg"}
          alt={story?.name || "Anonymous"}
          className="rounded-full w-12 h-12"
        />
        <div>
          <CardTitle className="text-lg">{story?.name || "Anonymous"}</CardTitle>
          <CardDescription>{story?.role || "Pekerjaan Tidak Diketahui"}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{story?.testimony || "Testimoni tidak tersedia."}</p>
      <div className="flex gap-1 mt-4">
        {Array.from({ length: story?.rating || 0 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
    </CardContent>
  </Card>
);

// Main component
export default function Landing({ auth }: { auth: { user: User | null } }) {
  const user = auth.user;
  const [email, setEmail] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("features");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setEmail("");
    alert("Terima kasih telah berlangganan!");
  };

  return (
    <>
      <Head title="PSIKOBANK - Platform Psikotes #1 di Indonesia" />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <Navbar user={user} />

        {/* Hero Section */}
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
                      <DialogDescription>
                        Lihat bagaimana PSIKOBANK dapat membantu persiapan psikotes Anda
                      </DialogDescription>
                    </DialogHeader>
                    {/* Add video content here */}
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section with Enhanced Animations */}
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-background rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {stat.icon}
          </motion.div>
          <div className="text-4xl font-bold text-center text-primary">
            {stat.value}{stat.suffix}
          </div>
          <motion.p 
            className="text-center text-muted-foreground mt-2"
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
</section>s

        {/* Enhanced Features Section with Tabs */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Fitur Unggulan</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Solusi lengkap untuk persiapan psikotes dengan teknologi terkini
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex justify-center mb-8">
                <TabsTrigger value="all">Semua Fitur</TabsTrigger>
                <TabsTrigger value="learning">Pembelajaran</TabsTrigger>
                <TabsTrigger value="practice">Latihan</TabsTrigger>
                <TabsTrigger value="support">Dukungan</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
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
                        <CardContent>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, i) => (
                              <motion.li
                                key={i}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <span>{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Add similar TabsContent for other tabs */}
            </Tabs>
          </div>
        </section>

        {/* Study Paths Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Jalur Pembelajaran</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Program khusus yang dirancang untuk berbagai kebutuhan karier
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {studyPaths.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StudyPathCard path={path} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Kisah Sukses</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Testimoni dari mereka yang telah berhasil mencapai impiannya
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TestimonialCard story={story} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Pilihan Paket</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Investasi terbaik untuk masa depan kariermu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${plan.featured ? 'md:-mt-8' : ''}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Rekomendasi
                      </Badge>
                    </div>
                  )}
                  <Card className={`h-full ${plan.featured ? 'border-primary shadow-lg scale-105' : ''}`}>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-4">
                        {plan.tag}
                      </Badge>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-lg">
                        {plan.description}
                      </CardDescription>
                      <div className="mt-4 flex items-baseline">
                        {plan.price !== "Custom" ? (
                          <>
                            <span className="text-4xl font-bold">Rp {plan.price}</span>
                            <span className="text-muted-foreground ml-2">/{plan.duration}</span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">Custom</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
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
                        <Button 
                          className="w-full" 
                          variant={plan.featured ? "default" : "outline"}
                          size="lg"
                        >
                          {plan.price === "Custom" ? "Hubungi Kami" : "Mulai Sekarang"}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievement Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Pencapaian Kami</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Membantu ribuan orang mencapai impian mereka
              </p>
            </motion.div>
            <Achievements />
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Dapatkan Update Terbaru
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Berlangganan newsletter kami untuk mendapatkan tips, artikel,
                dan promo eksklusif
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

        {/* Enhanced Footer */}
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
                <Link href="/" className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-primary" />
                  <span className="font-bold text-xl">PSIKOBANK</span>
                </Link>
                <p className="text-muted-foreground">
                  Platform pembelajaran psikotes terpercaya dengan teknologi AI
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: "facebook", href: "#" },
                    { icon: "twitter", href: "#" },
                    { icon: "instagram", href: "#" },
                    { icon: "linkedin", href: "#" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.icon}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <span className="sr-only">{social.icon}</span>
                      {social.icon === "facebook" && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                        </svg>
                      )}
                      {social.icon === "twitter" && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                      )}
                      {social.icon === "instagram" && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                      {social.icon === "linkedin" && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {[
                {
                  title: "Produk",
                  links: [
                    "Bank Soal",
                    "Simulasi Ujian",
                    "Konsultasi Psikolog",
                    "Video Pembelajaran",
                    "Analisis AI"
                  ]
                },
                {
                  title: "Perusahaan",
                  links: [
                    "Tentang Kami",
                    "Karir",
                    "Blog",
                    "Partner",
                    "Press Kit"
                  ]
                },
                {
                  title: "Bantuan",
                  links: [
                    "FAQ",
                    "Hubungi Kami",
                    "Kebijakan Privasi",
                    "Syarat & Ketentuan",
                    "Status Layanan"
                  ]
                }
              ].map((column, columnIndex) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                >
                  <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: linkIndex * 0.1 }}
                      >
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 pt-8 border-t"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <p className="text-muted-foreground text-sm">
                  © 2024 PSIKOBANK. Hak Cipta Dilindungi Undang-Undang.
                </p>
                <div className="flex justify-start md:justify-end space-x-4 text-sm text-muted-foreground">
                  <Link href="#" className="hover:text-primary">Kebijakan Privasi</Link>
                  <Link href="#" className="hover:text-primary">Syarat & Ketentuan</Link>
                  <Link href="#" className="hover:text-primary">Peta Situs</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Jump to Top Button */}
        <JumpToTop />
      </div>
    </>
  );
}