import React from 'react';
import RegisterPage from './components/RegisterPage';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Footer from './components/Footer';
import { Text } from '@react-three/drei';
import './App.css'

function App() {
  const gradientStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(#2b1055, #7597de)',
    backgroundAttachment: 'fixed',
};


  return (
    <>
    <div style={gradientStyle} className='h-full '>
      <Page1 />
      <Page2/>
      
      <Footer/>
    </div>
    </>
  );
}

export default App;