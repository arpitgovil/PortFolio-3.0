import { ArrowRight, Download, Code, Zap, Sparkles, Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import profileImage from 'figma:asset/73760d27ac06a8347baceaf799c2d9807e875ed6.png';

interface HeroProps {
  onContactClick: () => void;
}

export function Hero({ onContactClick }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const techIcons = [
    { icon: Code, label: 'React', delay: 0, color: 'from-blue-500 to-cyan-500' },
    { icon: Terminal, label: 'Node.js', delay: 0.2, color: 'from-green-500 to-emerald-500' },
    { icon: Zap, label: 'Next.js', delay: 0.4, color: 'from-cyan-500 to-teal-500' },
    { icon: Sparkles, label: 'TypeScript', delay: 0.6, color: 'from-blue-600 to-cyan-600' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
        }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4 inline-flex items-center px-4 py-2 rounded-full glass glow-accent border border-primary/20"
              >
                <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse" />
                <span className="text-sm text-primary">Available for new projects</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="gradient-text">
                    ARPIT GOVIL
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500 origin-left"
                  />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-6"
              >
                <h2 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Full-Stack Developer
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  I create modern, responsive web applications with clean code and beautiful user experiences. 
                  Passionate about React, Node.js, and cutting-edge technologies that push the boundaries of what's possible.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button 
                onClick={onContactClick} 
                size="lg" 
                className="group relative overflow-hidden glow-primary pulse-glow bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-blue-600 transition-all duration-500"
              >
                <span className="relative z-10">Contact Me</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group glass border-primary/30 hover:border-primary/50 hover:glow-secondary transition-all duration-300"
                onClick={() => {
                  // Convert Google Drive view link to direct download link
                  const driveFileId = '17cwKATROmwExFDDOEP2zTR7AQB9RNjqW';
                  const downloadLink = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
                  window.open(downloadLink, '_blank');
                }}
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
            </motion.div>

            {/* Floating tech badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {techIcons.map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + tech.delay, duration: 0.5 }}
                  className="group relative"
                >
                  <div className={`inline-flex items-center px-3 py-2 rounded-full glass border border-white/20 bg-gradient-to-r ${tech.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 hover:glow-accent cursor-default`}>
                    <tech.icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{tech.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main avatar container */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/30 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full p-2 glass glow-primary">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <ImageWithFallback
                      src={profileImage}
                      alt="ARPIT GOVIL - Professional Developer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10" />
                  </div>
                </div>
              </motion.div>
              
              {/* Orbiting elements */}
              {[
                { size: 'w-16 h-16', position: '-top-8 -right-8', icon: Code, delay: 0, color: 'from-blue-500 to-cyan-500' },
                { size: 'w-14 h-14', position: '-bottom-6 -left-6', icon: Zap, delay: 1, color: 'from-cyan-500 to-teal-500' },
                { size: 'w-12 h-12', position: 'top-1/4 -left-6', icon: Terminal, delay: 2, color: 'from-green-500 to-emerald-500' },
                { size: 'w-10 h-10', position: 'bottom-1/4 -right-5', icon: Sparkles, delay: 3, color: 'from-teal-500 to-cyan-500' }
              ].map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1 + element.delay * 0.2, duration: 0.6, ease: "easeOut" }}
                  className={`absolute ${element.position} ${element.size} glass glow-accent rounded-full flex items-center justify-center float-animation border border-white/20`}
                  style={{ animationDelay: `${element.delay * -1.5}s` }}
                >
                  <div className={`w-2/3 h-2/3 bg-gradient-to-r ${element.color} rounded-full flex items-center justify-center`}>
                    <element.icon className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              ))}

              {/* Floating particles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}