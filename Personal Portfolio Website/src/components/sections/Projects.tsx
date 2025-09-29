import { ExternalLink, Github, Folder, Star, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ScrollReveal, StaggeredReveal } from '../ui/ScrollReveal';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  featured?: boolean;
  stats?: {
    stars: number;
    views: number;
  };
}

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzU4NzgwNjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      githubUrl: 'https://github.com/alexjohnson/ecommerce-platform',
      demoUrl: 'https://ecommerce-demo.alexjohnson.dev',
      featured: true,
      stats: { stars: 124, views: 2580 }
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTg4ODM4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Socket.io', 'Motion'],
      githubUrl: 'https://github.com/alexjohnson/task-manager',
      demoUrl: 'https://tasks.alexjohnson.dev',
      featured: true,
      stats: { stars: 89, views: 1920 }
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location search, 7-day forecast, and interactive charts powered by weather APIs.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTg5MDQ2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS Modules'],
      githubUrl: 'https://github.com/alexjohnson/weather-dashboard',
      demoUrl: 'https://weather.alexjohnson.dev',
      stats: { stars: 45, views: 1120 }
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TypeScript, featuring dark mode and smooth animations.',
      image: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzU4NzgwNjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      githubUrl: 'https://github.com/alexjohnson/portfolio',
      demoUrl: 'https://alexjohnson.dev',
      stats: { stars: 67, views: 890 }
    },
    {
      id: '5',
      title: 'Chat Application',
      description: 'Real-time chat application with multiple rooms, user authentication, and message history powered by Socket.io.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTg5MDQ2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB'],
      githubUrl: 'https://github.com/alexjohnson/chat-app',
      demoUrl: 'https://chat.alexjohnson.dev',
      stats: { stars: 32, views: 650 }
    },
    {
      id: '6',
      title: 'Blog Platform',
      description: 'A full-featured blog platform with markdown support, comments system, and admin panel for content management.',
      image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTg4ODM4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
      githubUrl: 'https://github.com/alexjohnson/blog-platform',
      demoUrl: 'https://blog.alexjohnson.dev',
      stats: { stars: 78, views: 1340 }
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7.5, -7.5]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7.5, 7.5]));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXPercent = (e.clientX - rect.left) / width - 0.5;
      const mouseYPercent = (e.clientY - rect.top) / height - 0.5;
      mouseX.set(mouseXPercent);
      mouseY.set(mouseYPercent);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        style={{
          rotateX: featured ? rotateX : 0,
          rotateY: featured ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setHoveredProject(project.id)}
        onHoverEnd={() => setHoveredProject(null)}
        className="group perspective-1000"
      >
        <Card className="glass border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden group-hover:glow-primary h-full flex flex-col">
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className={`w-full object-cover transition-all duration-700 ${
                  featured ? 'h-64' : 'h-48'
                } group-hover:brightness-75`}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0,
                  y: hoveredProject === project.id ? 0 : 20 
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 right-4 flex gap-2"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="glass bg-black/20 hover:bg-primary/80 border-white/20">
                    <Github className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="glass bg-black/20 hover:bg-primary/80 border-white/20">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats overlay */}
              {project.stats && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0,
                    x: hoveredProject === project.id ? 0 : 20 
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute top-4 right-4 glass bg-black/20 rounded-lg p-2 border border-white/20"
                >
                  <div className="flex items-center space-x-3 text-xs text-white">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white border border-white/30 glow-primary">
                    Featured
                  </Badge>
                </div>
              )}
            </motion.div>
          </div>

          <CardHeader className="pb-2">
            <motion.h3 
              className={`font-bold gradient-text ${featured ? 'text-xl' : 'text-lg'}`}
              whileHover={{ scale: 1.02 }}
            >
              {project.title}
            </motion.h3>
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, featured ? 5 : 3).map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs glass border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {project.technologies.length > (featured ? 5 : 3) && (
                <Badge variant="outline" className="text-xs glass border-white/30">
                  +{project.technologies.length - (featured ? 5 : 3)}
                </Badge>
              )}
            </div>

            {!featured && (
              <div className="flex gap-2 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" variant="outline" className="glass hover:glow-accent">
                    <Github className="h-3 w-3 mr-1" />
                    Code
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" variant="outline" className="glass hover:glow-accent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Demo
                  </Button>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass glow-accent border border-primary/20 mb-6"
            >
              <Folder className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-primary">My Work</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and side projects that demonstrate my skills and passion for development.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {featuredProjects.map((project, index) => (
              <ScrollReveal 
                key={project.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.2}
              >
                <ProjectCard project={project} featured={true} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <ScrollReveal>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 gradient-text">
              More Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <StaggeredReveal staggerDelay={0.1}>
                {otherProjects.map((project) => (
                  <div key={project.id} className="h-full">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}