import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setEmail("");
    alert("Terima kasih telah berlangganan!");
  };

  return (
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
            onSubmit={handleSubmit}
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
  );
}