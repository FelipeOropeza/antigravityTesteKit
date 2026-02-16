const Footer = () => {
    return (
      <footer className="footer bg-bg-darker text-text-muted py-16 border-t border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-8 grid md:grid-cols-3 gap-12">
            <div className="footer-col">
                <h4 className="text-accent-gold font-bold mb-4 uppercase tracking-widest text-sm">Nocturna</h4>
                <p className="text-sm font-light leading-relaxed">123 Obsidian Ave, New York, NY</p>
            </div>
            <div className="footer-col">
                <h4 className="text-accent-gold font-bold mb-4 uppercase tracking-widest text-sm">Hours</h4>
                <p className="text-sm font-light leading-relaxed">Tue - Sun: 18:00 - 02:00</p>
            </div>
            <div className="footer-col">
                <h4 className="text-accent-gold font-bold mb-4 uppercase tracking-widest text-sm">Contact</h4>
                <p className="text-sm font-light leading-relaxed mb-4">+1 (555) 000-0000</p>
                <div className="socials flex gap-4 text-xs font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-accent-gold transition-colors">IG</a>
                    <a href="#" className="hover:text-accent-gold transition-colors">FB</a>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-8 mt-16 pt-8 border-t border-white/5 text-center text-xs opacity-30 font-light tracking-wider">
            <p>&copy; 2026 NOCTURNA. All rights reserved.</p>
        </div>
      </footer>
    );
};

export default Footer;
