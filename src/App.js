import React from 'react';
import logo from './logo.svg';
import Hero from './components/Hero';
import Features from './components/Features';
import Cta from './components/Cta';
import './App.css';
import VideoEditor from './components/VideoEditor';

function App() {
  return (
    <div className="App">
      <Hero/>
      <Features/>
      <VideoEditor/>
      <Cta/>
    </div>//
  );
}

export default App;
