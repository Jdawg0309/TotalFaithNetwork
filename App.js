import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import GlobalStyles from './GlobalStyles';
import Services from './pages/Services';

// Main App component with router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Component that uses router hooks
function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;