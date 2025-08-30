const express = require('express');
const { PrismaClient } = require('../../generated/prisma');
const router = express.Router();

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Date query parameter is required' });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        event_date: new Date(date),
      },
    });

    if (booking) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
