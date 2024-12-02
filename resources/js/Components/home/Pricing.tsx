import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { CheckCircle } from "lucide-react";
import { pricingPlans } from "@/data";

export default function Pricing() {
  return (
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
  );
}