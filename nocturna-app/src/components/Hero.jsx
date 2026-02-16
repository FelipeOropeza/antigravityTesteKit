import { motion } from 'framer-motion';

const Hero = ({ onOpenReservation }) => {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] bg-cover bg-center scale-110 transition-transform duration-[10s]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-bg-dark"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="text-5xl md:text-8xl leading-none font-heading mb-8"
        >
          <span className="block">TASTE THE</span>
          <span className="block text-accent-gold italic">DARKNESS</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="text-lg md:text-xl text-text-muted max-w-xl mx-auto mb-12 font-body font-light tracking-wide"
        >
          Avant-garde cuisine for the nocturnal soul.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
        >
          <button 
            onClick={onOpenReservation}
            className="border-2 border-text-primary text-text-primary px-10 py-4 font-semibold hover:bg-text-primary hover:text-bg-dark transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Book Experience
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div 
          animate={{ height: ['0px', '40px', '0px'], translateY: ['0px', '0px', '40px'], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-text-primary h-[40px]"
        />
      </div>
    </section>
  );
};

export default Hero;
