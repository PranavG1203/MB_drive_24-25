import  { useEffect } from 'react';
// import StarField from './Star';

function Page1() {
  useEffect(() => {
    const stars = document.querySelector('.stars');
    const moon = document.querySelector('.moon');
    const mountains = document.querySelector('.mountains');
    const frontTrees = document.querySelector('.trees');
    const text = document.querySelector('.text');

    const easeOutQuad = (t) => t * (2 - t);

    let scrollY = 0;
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScrollTop;
      lastScrollTop = currentScroll;

      // Adjust factor for up vs down
      const scrollFactor = isScrollingDown ? 0.01 : 0.05; // Faster catch-up when scrolling up
      scrollY += (currentScroll - scrollY) * scrollFactor;

      const easedValue = easeOutQuad(scrollY / window.innerHeight);

      const moonMaxTranslateY = 600;
      if (stars) stars.style.transform = `translateX(${easedValue * 200}px)`;
      if (moon) moon.style.transform = `translateY(${Math.min(easedValue * 600, moonMaxTranslateY)}px)`;
      if (mountains) mountains.style.transform = `translateY(${easedValue * 400}px)`;
      if (frontTrees) frontTrees.style.transform = `translateY(${easedValue * 700}px)`;
      if (text) text.style.transform = `translateY(${easedValue * 350}px)`;

      requestAnimationFrame(handleScroll);
    };

    handleScroll();

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
      <div style={gradientStyle} className="relative z-0 overflow-hidden h-screen">
  
        {/* Link and Logo */}
        <a href="https://www.wcewlug.org/" className="absolute right-5 top-3 z-[600]">
          <img className="w-[10vh] md:w-[18vh]" src="wlug.png" alt="WLUG Logo" />
        </a>

        {/* Background Images Container */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* <StarField/> */}
          <img className="stars absolute top-0 left-0 w-full h-full object-cover z-5" src="stars.png" alt="Stars" />
          <img className="moon absolute top-[-50px] right-0 w-full h-full object-cover object-top z-10 mix-blend-screen" src="moon.png" alt="Moon"/>
          <img className="mountains absolute top-0 left-0 w-full h-full object-cover md:left-48 z-35" src="mountains.svg" alt="Mountains" />
          
          {/* Moving Front Trees */}
          <img className="trees absolute top-0 bottom-3 left-0 w-full h-full object-cover z-40" src="front_trees.svg" alt="Front Trees" />
          
          {/* Static Inverted Front Trees */}
          <img className="trees-inverted absolute top-15 left-0 w-full h-full object-cover z-40 transform -scale-x-100" src="front_trees.svg" alt="Inverted Front Trees" />
        </div>

        {/* Heading Text */}
        <div className="text text-white font-bold text-[2.5vh] md:text-[10vh] text-center z-25 pt-72 md:pt-48 whitespace-nowrap ">
          Walchand Linux Users&#39; Group
        </div>

      </div>
    </>
  );
}

export default Page1;
