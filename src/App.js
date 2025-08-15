import React from 'react';
import logo from './logo.svg';
import Hero from './components/Hero';
import Features from './components/Features';
import Cta from './components/Cta';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero/>
      <Features/>
      <Cta/>
    </div>
  );
}

export default App;
