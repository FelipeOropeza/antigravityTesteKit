import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ReservationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '19:00',
    guests: 2
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => onClose(), 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-bg-dark border border-accent-gold p-12 text-center z-10"
        >
          <h2 className="text-3xl font-heading text-accent-gold mb-4">Confirmed</h2>
          <p className="text-text-muted">We await your arrival.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-[rgba(10,10,10,0.95)] border border-accent-gold p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-accent-gold transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-heading text-center text-accent-gold mb-8 tracking-wide">
          SECURE YOUR TABLE
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {status === 'error' && <p className="text-red-500 text-center text-xs uppercase tracking-widest">Failed to connect. Try again.</p>}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-text-muted block">Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary focus:border-accent-gold outline-none transition-colors"
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-text-muted block">Email (Optional)</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary focus:border-accent-gold outline-none transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text-muted block">Date</label>
              <input 
                type="date" 
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary focus:border-accent-gold outline-none transition-colors appearance-none"
                required 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text-muted block">Time</label>
              <select 
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary focus:border-accent-gold outline-none transition-colors appearance-none"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              >
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-text-muted block">Guests</label>
            <select 
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary focus:border-accent-gold outline-none transition-colors appearance-none"
              value={formData.guests}
              onChange={e => setFormData({...formData, guests: e.target.value})}
            >
              <option value="2">2 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6 Guests</option>
              <option value="10">Large Group</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-accent-gold text-bg-dark font-bold py-4 mt-4 border border-accent-gold hover:bg-transparent hover:text-accent-gold transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReservationModal;
