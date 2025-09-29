import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'arpitgovil2004@gmail.com',
      href: 'mailto:arpitgovil2004@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '78592046911',
      href: 'tel:78592046911',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Meerut, UP',
      href: null,
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/arpitgovil',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/arpitgovil',
      color: 'hover:text-blue-500'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/arpitgovil',
      color: 'hover:text-cyan-400'
    }
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass glow-accent border border-primary/20 mb-6"
            >
              <MessageSquare className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-primary">Get In Touch</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Let's create something amazing together.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <Card className="glass border-white/10 glow-primary">
              <CardHeader>
                <CardTitle className="gradient-text">Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div 
                      className="relative space-y-2"
                      whileFocusWithin={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label 
                        htmlFor="name"
                        className={`transition-colors duration-300 ${
                          focusedField === 'name' ? 'text-primary' : ''
                        }`}
                      >
                        Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="glass border-white/20 focus:border-primary/50 focus:glow-accent transition-all duration-300"
                          required
                        />
                        <AnimatePresence>
                          {focusedField === 'name' && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 origin-left"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative space-y-2"
                      whileFocusWithin={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label 
                        htmlFor="email"
                        className={`transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-primary' : ''
                        }`}
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="glass border-white/20 focus:border-primary/50 focus:glow-accent transition-all duration-300"
                          required
                        />
                        <AnimatePresence>
                          {focusedField === 'email' && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 origin-left"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="relative space-y-2"
                    whileFocusWithin={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label 
                      htmlFor="message"
                      className={`transition-colors duration-300 ${
                        focusedField === 'message' ? 'text-primary' : ''
                      }`}
                    >
                      Message
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project or just say hello..."
                        className="min-h-[120px] resize-none glass border-white/20 focus:border-primary/50 focus:glow-accent transition-all duration-300"
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      <AnimatePresence>
                        {focusedField === 'message' && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 origin-left"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full group relative overflow-hidden glow-primary pulse-glow bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-blue-600 transition-all duration-500" 
                      disabled={isSubmitting}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                            />
                            Sending...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <span className="relative z-10">Send Message</span>
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 gradient-text">
                  Let's connect
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you're a startup looking to build your MVP or an established 
                  company wanting to modernize your tech stack, I'm here to help.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-4 rounded-xl glass border border-white/10 hover:border-primary/30 transition-all duration-300 hover:glow-accent">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${info.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <info.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium mb-1">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8"
              >
                <h4 className="font-semibold mb-4 gradient-text">Follow me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:glow-accent ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-8 glass p-6 rounded-xl border border-white/10"
              >
                <h4 className="font-semibold mb-4 gradient-text">Response Time</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I typically respond to messages within 24 hours. For urgent inquiries, 
                  please call or mention "urgent" in your message subject.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}