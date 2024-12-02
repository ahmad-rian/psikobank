import { Link } from "@inertiajs/react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerSections = [
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
  ];

  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">PSIKOBANK</span>
            </Link>
            <p className="text-muted-foreground">
              Platform pembelajaran psikotes terpercaya dengan teknologi AI
            </p>
            {/* Social Media Links */}
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
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
  );
}