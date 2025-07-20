// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import GlobalStyles from './GlobalStyles';

import Home       from './pages/public/Home';
import About      from './pages/public/About';
import Contact    from './pages/public/Contact';
import Portfolio  from './pages/public/Portfolio';
import Blog       from './pages/public/Blog';
import BlogDetail from './pages/public/BlogDetail';
import ShortsFeed from './pages/public/ShortsFeed';

import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />

      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/portfolio"   element={<Portfolio />} />
        <Route path="/shorts" element={<ShortsFeed />} />
        {/* ─── BLOG ───────────────────────────────────── */}
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blogs/:id"   element={<BlogDetail />} />

        {/* ─── ADMIN ──────────────────────────────────── */}
        <Route path="/admin/login"    element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
