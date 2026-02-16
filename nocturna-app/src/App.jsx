import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

const App = () => {
    // Current Path (Simple routing)
    const [path, setPath] = useState(window.location.pathname);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // ADMIN ROUTING
    if (path === '/admin') {
        if (!isAdmin) {
            return <AdminLogin onLogin={setIsAdmin} />;
        }
        return <AdminDashboard onLogout={() => setIsAdmin(false)} />;
    }

    // MAIN SITE
    return (
        <div className="bg-bg-dark text-text-primary overflow-x-hidden font-body selection:bg-accent-gold selection:text-bg-dark">
            <Navbar onOpenReservation={() => setModalOpen(true)} />

            <main>
                <Hero onOpenReservation={() => setModalOpen(true)} />
                <Experience />
                <Menu />
            </main>

            <Footer />

            <AnimatePresence>
                {modalOpen && (
                    <ReservationModal onClose={() => setModalOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
