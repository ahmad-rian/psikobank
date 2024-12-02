import { motion } from "framer-motion";
import { Trophy, Award, Users, Star } from "lucide-react";

export default function Achievements() {
  const achievements = [
    { icon: <Trophy />, value: "250+", label: "Perusahaan Partner" },
    { icon: <Award />, value: "95%", label: "Tingkat Kepuasan" },
    { icon: <Users />, value: "50K+", label: "Alumni Sukses" },
    { icon: <Star />, value: "4.9/5", label: "Rating Google" }
  ];

  return (
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
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
      </div>
    </section>
  );
}