import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';

function Page1() {
  useEffect(() => {
    const stars = document.querySelector('.stars');
    const moon = document.querySelector('.moon');
    const mountains = document.querySelector('.mountains');
    const frontTrees = document.querySelector('.trees');
    const text = document.querySelector('.text');

    // Smoother easing function for gradual animations
    const easeOutQuad = (t) => t * (2 - t);

    let lastScrollTop = 0;
    let scrollY = 0;

    const handleScroll = () => {
      scrollY += (window.scrollY - scrollY) * 0.1; // Adds smoothing factor of 0.1 for gradual transitions

      const easedValue = easeOutQuad(scrollY / window.innerHeight);

      const moonMaxTranslateY = 600; // Reduced for slower movement

      // Apply smoother and slower transformations
      if (stars) stars.style.transform = `translateX(${easedValue * 100}px)`; // Slowed down by reducing factor
      if (moon) moon.style.transform = `translateY(${Math.min(easedValue * 300, moonMaxTranslateY)}px)`;
      if (mountains) mountains.style.transform = `translateY(${easedValue * 150}px)`;
      if (frontTrees) frontTrees.style.transform = `translateY(${easedValue * 50}px)`;
      if (text) text.style.transform = `translateY(${easedValue * 300}px)`;

      requestAnimationFrame(handleScroll); // Continuous animation loop
    };

    handleScroll(); // Initial call to start the scroll effect

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gradientStyle = {
    background: 'linear-gradient(#2b1055, #7597de)',
    backgroundAttachment: 'fixed',
  };

  return (
    <>
      <div style={gradientStyle} className="relative z-0 overflow-hidden h-screen md:h-[150vh]">
        
        {/* Link and Logo */}
        <a href="https://www.wcewlug.org/" className="absolute right-5 top-3 z-[600]">
          <img className="w-[10vh] md:w-[18vh]" src="wlug.png" alt="WLUG Logo" />
        </a>

        {/* Background Images */}
        <img className="stars absolute top-0 left-0 w-full z-10" src="stars.png" alt="Stars" />
        <img className="moon absolute top-0 right-0 w-full z-20 mix-blend-screen" src="moon.png" alt="Moon" />
        <img className="mountains absolute -top-0 left-0 w-full md:left-48 z-35" src="mountains.svg" alt="Mountains" />
        
        {/* Heading Text */}
        <div className="text text-white font-bold text-[2vh] md:text-[10vh] text-center z-30 pt-32 md:pt-48 whitespace-nowrap">
          Walchand Linux Users' Group
        </div>

        {/* Front Trees */}
        <img className="trees absolute top-0 left-0 w-full z-40" src="front_trees.svg" alt="Front Trees" />
        
      </div>
    </>
  );
}

export default Page1;
