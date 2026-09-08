import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import StickyCTA from "./components/layout/StickyCTA.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import IPv4Leasing from "./pages/IPv4Leasing.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy text-ink">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ipv4-leasing" element={<IPv4Leasing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <StickyCTA />
    </div>
  );
}
