import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectsManager } from './components/admin/ProjectsManager';
import { AboutManager } from './components/admin/AboutManager';
import { MessagesView } from './components/admin/MessagesView';
import { AnimatedBackground, GeometricShapes } from './components/ui/AnimatedBackground';
import { Button } from './components/ui/button';
import { Shield, Sparkles } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';

type AppMode = 'portfolio' | 'admin';
type AdminTab = 'dashboard' | 'projects' | 'about' | 'messages';

export default function App() {
  const [mode, setMode] = useState<AppMode>('portfolio');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading animation and dark theme setup
  useEffect(() => {
    // Apply dark theme to document
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to update active section with smooth detection
  useEffect(() => {
    if (mode !== 'portfolio') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  const handleContactClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('contact');
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setMode('portfolio');
    setActiveAdminTab('dashboard');
  };

  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'about':
        return <AboutManager />;
      case 'messages':
        return <MessagesView />;
      default:
        return (
          <AdminDashboard
            activeTab={activeAdminTab}
            onTabChange={setActiveAdminTab}
            onLogout={handleAdminLogout}
          />
        );
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold gradient-text mb-2"
          >
            ARPIT GOVIL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground"
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (mode === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <>
          <AdminLogin onLogin={handleAdminLogin} />
          <Toaster />
        </>
      );
    }

    return (
      <>
        {activeAdminTab === 'dashboard' ? (
          renderAdminContent()
        ) : (
          <div className="min-h-screen">
            <AnimatedBackground />
            <div className="flex relative z-10">
              {/* Sidebar */}
              <motion.div 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-64 glass border-r border-white/10 min-h-screen glow-secondary"
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    <h2 className="text-xl font-bold gradient-text">Admin Panel</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Portfolio Management</p>
                </div>
                
                <nav className="p-4 space-y-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: Shield },
                    { id: 'projects', label: 'Projects', icon: Shield },
                    { id: 'about', label: 'About Me', icon: Shield },
                    { id: 'messages', label: 'Messages', icon: Shield }
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Button
                        variant={activeAdminTab === item.id ? 'default' : 'ghost'}
                        className={`w-full justify-start transition-all duration-300 ${
                          activeAdminTab === item.id 
                            ? 'glow-primary bg-white/20 text-black' 
                            : 'hover:bg-white/5 hover:glow-accent'
                        }`}
                        onClick={() => setActiveAdminTab(item.id as AdminTab)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </nav>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:glow-primary"
                    onClick={handleAdminLogout}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </motion.div>
              </motion.div>

              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex-1 p-8"
              >
                {renderAdminContent()}
              </motion.div>
            </div>
          </div>
        )}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen relative dark"
      >
        {/* Animated backgrounds */}
        <AnimatedBackground />
        <GeometricShapes />
        
        <div className="relative z-10">
          <Header activeSection={activeSection} onSectionChange={setActiveSection} />
          
          {/* Admin Panel Access Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 300 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              className="group glow-primary pulse-glow bg-white/10 hover:bg-white/20 transition-all duration-500 shadow-2xl border border-white/20"
              size="sm"
              onClick={() => setMode('admin')}
            >
              <Shield className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Admin
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </motion.div>

          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key="portfolio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero onContactClick={handleContactClick} />
                <About />
                <Projects />
                <Contact />
              </motion.div>
            </AnimatePresence>
          </main>
          
          <Footer />
        </div>
      </motion.div>
      
      <Toaster />
    </>
  );
}