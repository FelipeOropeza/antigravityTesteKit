import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Security note: This is client-side basic check + server check
      onLogin(true);
    } else {
      setError('Invalid Access Key');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-bg-dark">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 border border-accent-gold/20 bg-bg-darker text-center"
      >
        <h2 className="text-2xl font-heading text-accent-gold mb-8 tracking-widest uppercase">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Key"
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-subtle)] p-3 text-text-primary text-center tracking-widest focus:border-accent-gold outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs uppercase tracking-widest">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-accent-gold text-bg-dark font-bold py-3 uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
