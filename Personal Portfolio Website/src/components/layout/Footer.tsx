import { Github, Linkedin, Twitter, Mail, Sparkles, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motion } from 'motion/react';

export function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/arpitgovil',
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/arpitgovil',
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/arpitgovil',
      label: 'Twitter',
      color: 'hover:text-cyan-400'
    },
    {
      icon: Mail,
      href: 'mailto:arpitgovil2004@gmail.com',
      label: 'Email',
      color: 'hover:text-green-400'
    }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <h3 className="text-2xl font-bold gradient-text">ARPIT GOVIL</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Full-Stack Developer passionate about creating modern web experiences 
                that push the boundaries of what's possible.
              </p>
              <div className="glass p-4 rounded-xl border border-white/10 glow-accent">
                <p className="text-sm text-primary flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Available for new projects
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 gradient-text">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="block text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="font-semibold mb-6 gradient-text">Let's Connect</h4>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow my journey and get in touch for collaborations.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:glow-accent ${link.color}`}
                    >
                      <link.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-6 p-4 glass rounded-xl border border-white/10"
                >
                  <p className="text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 inline mr-2 text-primary" />
                    arpitgovil2004@gmail.com
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} ARPIT GOVIL. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </motion.div>
                <span>and</span>
                <span className="text-primary">React</span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: -100,
              x: Math.sin(i) * 100
            }}
            transition={{
              duration: 8,
              delay: i * 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              bottom: 0
            }}
          />
        ))}
      </div>
    </footer>
  );
}