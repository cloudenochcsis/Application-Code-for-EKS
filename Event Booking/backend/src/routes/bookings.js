const express = require('express');
const { PrismaClient } = require('../../generated/prisma');
const router = express.Router();

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { event_date, event_type, customer_name, customer_email, customer_phone } = req.body;

  if (!event_date || !event_type || !customer_name || !customer_email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        event_date: new Date(event_date),
        event_type,
        customer_name,
        customer_email,
        customer_phone,
      },
    });
    res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Date already booked' });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        event_date: 'asc',
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
