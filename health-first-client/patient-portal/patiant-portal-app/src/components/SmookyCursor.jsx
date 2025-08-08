import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SmookyCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
      </motion.div>

      {/* Smoky trail */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 1,
        }}
      >
        <div className="w-4 h-4 bg-gradient-to-r from-primary-400/20 to-healthcare-400/20 rounded-full blur-sm" />
      </motion.div>

      {/* Additional smoky particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-30"
          animate={{
            x: mousePosition.x - 12 + (i * 4),
            y: mousePosition.y - 12 + (i * 4),
            opacity: isVisible ? 0.1 - (i * 0.03) : 0,
            scale: 1 - (i * 0.2),
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 1.5 + (i * 0.5),
            delay: i * 0.05,
          }}
        >
          <div className="w-6 h-6 bg-gradient-to-r from-primary-300/10 to-healthcare-300/10 rounded-full blur-md" />
        </motion.div>
      ))}
    </>
  );
};

export default SmookyCursor; 