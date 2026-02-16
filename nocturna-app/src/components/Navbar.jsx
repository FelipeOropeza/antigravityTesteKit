/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

const Navbar = ({ onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[rgba(10,10,10,0.8)] backdrop-blur-md' : 'mix-blend-difference'
      }`}
    >
      <div className="font-heading text-2xl font-bold tracking-widest text-primary">
        NOCTURNA
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-12 items-center">
        <a href="#menu" className="text-sm uppercase tracking-widest relative group">
          Menu
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#experience" className="text-sm uppercase tracking-widest relative group">
          Experience
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
        </a>
        <button 
          onClick={onOpenReservation}
          className="bg-accent-gold text-bg-dark px-6 py-3 font-semibold border border-accent-gold rounded-none hover:bg-transparent hover:text-accent-gold transition-all duration-300 uppercase tracking-widest text-xs"
        >
          Reserve Table
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-primary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-dark p-8 flex flex-col items-center gap-6 shadow-xl border-b border-border-subtle md:hidden animate-fade-in">
          <a href="#menu" className="text-lg uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#experience" className="text-lg uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <button 
            onClick={() => {
              onOpenReservation();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-accent-gold text-bg-dark py-4 font-bold border border-accent-gold hover:bg-transparent hover:text-accent-gold transition-colors uppercase tracking-widest"
          >
            Reserve Table
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
