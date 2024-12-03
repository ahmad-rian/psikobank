import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { CheckCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Tipe data untuk fitur
type Feature = {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
};

// Contoh data fitur
const features: Feature[] = [
  {
    icon: "CheckCircle",
    title: "Feature Title",
    description: "Feature description",
    benefits: ["Benefit 1", "Benefit 2"],
  },
];

export default function Features() {
  return (
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
              {features.map((feature: Feature, index: number) => {
                const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons] as React.ElementType;

                return (
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
                          {Icon && <Icon className="w-6 h-6 text-primary" />}
                        </motion.div>
                        <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        <CardDescription className="text-lg">{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit: string, i: number) => (
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
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
