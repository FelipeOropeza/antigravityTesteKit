const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Get Menu (All items)
app.get('/api/menu', async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// 2. Add Reservation
app.post('/api/reservations', async (req, res) => {
  const { name, date, guests, email, time } = req.body;
  
  if (!name || !date || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Combine Date + Time nicely
  const reservationDate = new Date(`${date}T${time}:00`);

  try {
    const newReservation = await prisma.reservation.create({
      data: {
        name,
        date: reservationDate,
        guests: parseInt(guests),
        email,
        status: 'pending'
      }
    });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// 3. Admin: View Reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const list = await prisma.reservation.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// --- ADMIN API EXTENSIONS ---

// 4. Admin Auth (Simple)
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    // Hardcoded for demo - ideally use ENV and Hash
    if (password === 'admin123') { 
        res.json({ success: true, token: 'demo-token-123' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// 5. Menu CRUD
app.post('/api/menu', async (req, res) => {
    try {
        const item = await prisma.menuItem.create({ data: req.body });
        res.json(item);
    } catch(e) { res.status(500).json({error: "Failed to create"}); }
});

app.put('/api/menu/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.menuItem.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.json(item);
    } catch(e) { res.status(500).json({error: "Failed to update"}); }
});

app.delete('/api/menu/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.menuItem.delete({ where: { id: parseInt(id) } });
        res.json({success: true});
    } catch(e) { res.status(500).json({error: "Failed to delete"}); }
});

// 6. Reservation Actions
app.put('/api/reservations/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'confirmed', 'rejected'
        const updated = await prisma.reservation.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(updated);
    } catch(e) { res.status(500).json({error: "Failed to update status"}); }
});


// Initialize & Seed (if empty)
const seedIfNeeded = async () => {
    const count = await prisma.menuItem.count();
    if (count === 0) {
        console.log("Seeding database...");
        await prisma.menuItem.createMany({
            data: [
                { name: "Obsidian Wagyu", description: "Charcoal crust, truffle emulsion, smoked salt.", price: 85, isSignature: true, category: "main" },
                { name: "Abyssal Scallop", description: "Black garlic puree, caviar, sea foam.", price: 42, isSignature: true, category: "starter" },
                { name: "Midnight Tart", description: "Dark chocolate 85%, blackberry gastrique, gold leaf.", price: 28, isSignature: true, category: "dessert" }
            ]
        });
    }
};

app.listen(PORT, async () => {
  await seedIfNeeded();
  console.log(`Server running on http://localhost:${PORT}`);
});
