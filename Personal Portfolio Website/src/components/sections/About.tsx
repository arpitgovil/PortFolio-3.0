import { Download, Code, Palette, Zap, Star, Award, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ScrollReveal, StaggeredReveal } from '../ui/ScrollReveal';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import profileImage from 'figma:asset/73760d27ac06a8347baceaf799c2d9807e875ed6.png';

export function About() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Next.js', level: 92, category: 'Framework' },
    { name: 'Python', level: 85, category: 'Language' },
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'AWS', level: 75, category: 'Cloud' },
    { name: 'Docker', level: 78, category: 'DevOps' },
    { name: 'GraphQL', level: 83, category: 'API' },
    { name: 'Tailwind CSS', level: 94, category: 'Styling' },
    { name: 'Git', level: 90, category: 'Tool' }
  ];

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices and modern architecture patterns',
      metric: '100+',
      metricLabel: 'Projects'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive user interfaces that prioritize user experience',
      metric: '95%',
      metricLabel: 'Satisfaction'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and exceptional user experiences',
      metric: '98%',
      metricLabel: 'Speed Score'
    }
  ];

  const stats = [
    { icon: Star, value: '5+', label: 'Years Experience' },
    { icon: Award, value: '50+', label: 'Projects Completed' },
    { icon: Users, value: '25+', label: 'Happy Clients' }
  ];

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass glow-accent border border-primary/20 mb-6"
            >
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-primary">About Me</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my background, skills, and what drives me as a developer.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="flex justify-center lg:justify-start">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative glass glow-primary p-2 rounded-2xl">
                  <ImageWithFallback
                    src={profileImage}
                    alt="ARPIT GOVIL - About"
                    className="w-80 h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-2 bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/20 rounded-xl pointer-events-none" />
                </div>
                
                {/* Floating stats */}
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    className={`absolute glass glow-accent p-3 rounded-xl border border-white/20 ${
                      index === 0 ? '-top-6 -right-6' :
                      index === 1 ? '-bottom-6 -left-6' :
                      'top-1/2 -left-8'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <stat.icon className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 gradient-text">
                Full-Stack Developer & UI/UX Enthusiast
              </h3>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4 mb-8"
              >
                <p className="text-muted-foreground leading-relaxed">
                  With over 5 years of experience in web development, I specialize in creating 
                  modern, scalable applications using the latest technologies. I'm passionate 
                  about clean code, user experience, and solving complex problems with elegant solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community through 
                  blog posts and talks.
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="group glow-primary bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-blue-600 transition-all duration-500"
                  onClick={() => {
                    // Convert Google Drive view link to direct download link
                    const driveFileId = '17cwKATROmwExFDDOEP2zTR7AQB9RNjqW';
                    const downloadLink = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
                    window.open(downloadLink, '_blank');
                  }}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download Resume
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Section */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 gradient-text">
              Skills & Technologies
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="group"
                >
                  <div className="glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:glow-accent">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.category}</span>
                    </div>
                    
                    <div className="w-full bg-muted/30 rounded-full h-2 mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                        className="h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                      className="text-xs text-primary font-medium"
                    >
                      {skill.level}%
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Highlights */}
        <StaggeredReveal>
          {highlights.map((highlight) => (
            <motion.div key={highlight.title}>
              <Card className="group glass glow-accent border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-blue-500/30 transition-all duration-500 glow-accent">
                      <highlight.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </motion.div>
                  
                  <h4 className="text-xl font-bold mb-3 gradient-text">{highlight.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{highlight.description}</p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{highlight.metric}</span>
                    <span className="text-sm text-muted-foreground">{highlight.metricLabel}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
}