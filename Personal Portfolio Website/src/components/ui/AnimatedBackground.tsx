import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
            transition: 'all 0.05s linear',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
          }}
        />
      ))}
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl float-animation" style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '-3s', boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '-1.5s', boxShadow: '0 0 25px rgba(255, 255, 255, 0.1)' }} />
    </div>
  );
}

export function GeometricShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Hexagon shapes */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 rotate-45 border border-white/20 float-animation" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
      <div className="absolute top-3/4 right-1/4 w-8 h-8 rotate-12 border border-white/20 float-animation" style={{ animationDelay: '-2s', boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
      <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rotate-45 border border-white/20 float-animation" style={{ animationDelay: '-4s', boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>
    </div>
  );
}