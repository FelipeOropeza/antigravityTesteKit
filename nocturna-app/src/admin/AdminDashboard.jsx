import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  X, Check, Trash2 } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'reservations'
  
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-bg-darker border-r border-border-subtle p-8 hidden md:block">
        <h1 className="text-2xl font-heading tracking-widest text-accent-gold mb-12">NOCTURNA <span className="text-xs text-text-muted block mt-2">ADMIN</span></h1>
        
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-300 uppercase tracking-widest text-xs font-bold ${activeTab === 'menu' ? 'border-accent-gold text-accent-gold bg-white/5' : 'border-transparent text-text-muted hover:text-white'}`}
          >
            Menu Management
          </button>
          <button 
            onClick={() => setActiveTab('reservations')}
            className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-300 uppercase tracking-widest text-xs font-bold ${activeTab === 'reservations' ? 'border-accent-gold text-accent-gold bg-white/5' : 'border-transparent text-text-muted hover:text-white'}`}
          >
            Reservations
          </button>
          <button 
            onClick={onLogout}
            className="w-full text-left px-4 py-3 border-l-2 border-transparent text-red-400 hover:text-red-500 transition-all duration-300 uppercase tracking-widest text-xs font-bold mt-8"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-8 md:p-12">
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {activeTab === 'menu' ? <MenuManager /> : <ReservationManager />}
        </motion.div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const MenuManager = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'main' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setItems(data);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newItem, price: parseFloat(newItem.price) })
        });
        setLoading(false);
        setNewItem({ name: '', description: '', price: '', category: 'main' });
        fetchMenuItems();
    };

    const handleDelete = async (id) => {
        if(!confirm("Are you sure?")) return;
        await fetch(`/api/menu/${id}`, { method: 'DELETE' });
        fetchMenuItems();
    };

    return (
        <div>
            <h2 className="text-3xl font-heading text-accent-gold mb-8 uppercase tracking-widest">Global Menu Control</h2>
            
            {/* Add Form */}
            <div className="bg-bg-darker border border-border-subtle p-8 mb-12">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-text-muted">Add New Dish</h3>
                <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-text-muted">Item Name</label>
                        <input className="w-full bg-bg-dark border border-border-subtle p-3 text-text-primary outline-none focus:border-accent-gold" 
                            value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required placeholder="E.g. Void Burger" />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs uppercase text-text-muted">Description</label>
                        <input className="w-full bg-bg-dark border border-border-subtle p-3 text-text-primary outline-none focus:border-accent-gold" 
                            value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} required placeholder="Ingredients, texture..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-text-muted">Price ($)</label>
                        <input type="number" className="w-full bg-bg-dark border border-border-subtle p-3 text-text-primary outline-none focus:border-accent-gold" 
                            value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required placeholder="0.00" />
                    </div>
                    <button disabled={loading} className="col-span-4 bg-accent-gold text-bg-dark font-bold py-3 hover:opacity-90 transition-opacity uppercase tracking-widest text-xs">
                        {loading ? 'Processing...' : '+ Add to Menu'}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="relative bg-bg-darker p-6 border border-border-subtle group hover:border-accent-gold transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-heading text-lg text-text-primary">{item.name}</h4>
                            <span className="text-accent-gold font-bold">${item.price}</span>
                        </div>
                        <p className="text-sm text-text-muted font-light mb-4 min-h-[40px]">{item.description}</p>
                        <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-[-40px] opacity-0 group-hover:opacity-100 group-hover:right-4 bg-red-500/20 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white transition-all duration-300">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReservationManager = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const res = await fetch('/api/reservations');
        const data = await res.json();
        setReservations(data);
    };

    const updateStatus = async (id, status) => {
        await fetch(`/api/reservations/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        fetchReservations();
    };

    return (
        <div>
            <h2 className="text-3xl font-heading text-accent-gold mb-8 uppercase tracking-widest">Reservation Requests</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs uppercase tracking-widest text-text-muted border-b border-border-subtle">
                            <th className="p-4 font-normal">Guest</th>
                            <th className="p-4 font-normal">Date & Time</th>
                            <th className="p-4 font-normal">Details</th>
                            <th className="p-4 font-normal text-right">Status</th>
                            <th className="p-4 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-text-primary">
                        {reservations.map(res => (
                            <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold">{res.name}</div>
                                    <div className="text-xs text-text-muted">{res.email}</div>
                                </td>
                                <td className="p-4">
                                    <div>{new Date(res.date).toLocaleDateString()}</div>
                                    <div className="text-xs text-text-muted">{new Date(res.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                </td>
                                <td className="p-4">{res.guests} Guests</td>
                                <td className="p-4 text-right">
                                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold border ${
                                        res.status === 'confirmed' ? 'border-green-500 text-green-500' :
                                        res.status === 'rejected' ? 'border-red-500 text-red-500' :
                                        'border-yellow-500 text-yellow-500'
                                    }`}>
                                        {res.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {res.status === 'pending' && (
                                        <>
                                            <button onClick={() => updateStatus(res.id, 'confirmed')} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black transition-colors" title="Approve">
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => updateStatus(res.id, 'rejected')} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Reject">
                                                <X size={16} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
