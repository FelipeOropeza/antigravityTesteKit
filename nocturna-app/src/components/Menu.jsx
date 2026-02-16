import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  // Map gradient styles for demo visual consistency if no image
  const getGradient = (index) => {
    const gradients = [
      "bg-[linear-gradient(45deg,#1a1a1a,#000)]",
      "bg-[linear-gradient(135deg,#0d0d0d,#1a1a1a)]",
      "bg-[linear-gradient(225deg,#111,#000)]"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="menu" className="py-32 bg-gradient-to-b from-bg-dark to-bg-darker overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-heading tracking-widest uppercase mb-4"
          >
            Signatures
          </motion.h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-accent-gold animate-pulse tracking-widest text-xs uppercase">
            Loading Culinary Art...
          </div>
        )}

        {/* Horizontal Scroller */}
        {!loading && (
          <div className="flex gap-8 overflow-x-auto pb-16 snap-x snap-mandatory scrollbar-hide md:justify-center">
            {menuItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="min-w-[300px] bg-[var(--color-glass-bg)] border border-[var(--color-border-subtle)] p-6 snap-center hover:border-accent-gold hover:-translate-y-2 transition-all duration-300 group cursor-pointer backdrop-blur-sm"
              >
                {/* Image Placeholder */}
                <div className={`h-[250px] w-full mb-6 overflow-hidden ${getGradient(index)} flex items-center justify-center opacity-80 group-hover:scale-105 transition-transform duration-500`}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs tracking-widest text-text-muted opacity-30">[ DISH IMAGE ]</span>
                  )}
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-heading tracking-wide mb-2 group-hover:text-accent-gold transition-colors">{item.name}</h3>
                  <span className="text-accent-gold font-bold text-lg">${item.price}</span>
                </div>
                
                <p className="text-sm text-text-muted font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
