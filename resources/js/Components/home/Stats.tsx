import { motion } from "framer-motion";
import { stats } from "@/data";
import { Card } from "@/Components/ui/card";
import * as LucideIcons from "lucide-react";

export default function Stats() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = LucideIcons[stat.icon as keyof typeof LucideIcons];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
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
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}