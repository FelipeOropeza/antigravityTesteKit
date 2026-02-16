import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-8 relative bg-bg-dark">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text Block */}
        <div className="md:pr-8 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-accent-amber text-xs uppercase tracking-[0.2em] mb-4"
          >
            THE PHILOSOPHY
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading leading-tight mb-8"
          >
            SHADOWS & <br/><span className="italic text-text-muted opacity-50">FLAVORS</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-text-muted text-lg max-w-md mx-auto md:mx-0 leading-relaxed font-light"
          >
            We believe that true flavor is found in the depths. 
            Our menu is a curated journey through texture, temperature, 
            and time. No compromises. Just pure, unadulterated culinary art.
          </motion.p>
        </div>

        {/* Image Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'circOut' }}
          className="relative h-[600px] w-full transform md:translate-y-12 shadow-2xl border border-border-subtle overflow-hidden"
        >
          {/* Placeholder Image */}
          <div className="w-full h-full bg-bg-darker flex items-center justify-center text-text-muted tracking-widest text-xs uppercase border border-white/5 opacity-50 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]">
            [ Interior Ambiance ]
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
