import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { Clock, BookOpen } from "lucide-react";
import { studyPaths } from "@/data";

type StudyPath = {
  title: string;
  duration: string;
  modules: number;
  progress: number;
};

export default function StudyPaths() {
  return (
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
          {studyPaths.map((path: StudyPath, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {path.modules} Modul
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={path.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    0/{path.modules} modul selesai
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Mulai Belajar</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
