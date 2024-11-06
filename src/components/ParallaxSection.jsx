// src/components/ParallaxSection.js
import React from 'react';
import './ParallaxSection.css';

const ParallaxSection = () => {
  return (
    <div className="parallax-container">
      <div className="parallax-layer layer-1">
        <h1>Welcome to Our Site</h1>
      </div>
      <div className="parallax-layer layer-2"></div>
      <div className="parallax-layer layer-3"></div>
    </div>
  );
};

export default ParallaxSection;
