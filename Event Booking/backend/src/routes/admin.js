const express = require('express');
const { PrismaClient } = require('../../generated/prisma');
const router = express.Router();

const prisma = new PrismaClient();

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));

// Admin Dashboard Route
router.get('/dashboard', async (req, res) => {
  try {
    // Get all bookings
    const bookings = await prisma.booking.findMany({
      orderBy: {
        event_date: 'asc',
      },
    });

    // Calculate statistics
    const total = bookings.length;
    const now = new Date();
    const upcoming = bookings.filter(booking => new Date(booking.event_date) >= now).length;
    const past = total - upcoming;

    const stats = {
      total,
      upcoming,
      past,
    };

    // Render the admin dashboard
    res.render('admin-dashboard', { bookings, stats });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).send('Internal server error');
  }
});

// Export bookings as CSV
router.get('/export', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        event_date: 'asc',
      },
    });

    // Create CSV content
    const csvHeader = 'Event Date,Event Type,Customer Name,Customer Email,Customer Phone,Booking Date\n';
    const csvContent = bookings.map(booking => {
      return [
        new Date(booking.event_date).toLocaleDateString(),
        booking.event_type,
        booking.customer_name,
        booking.customer_email,
        booking.customer_phone || '',
        new Date(booking.created_at).toLocaleDateString()
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvContent;

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings-export.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting bookings:', error);
    res.status(500).send('Internal server error');
  }
});

// Edit Booking Form Route
router.get('/edit/:id', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    res.render('edit-booking', { booking });
  } catch (error) {
    console.error('Error fetching booking for edit:', error);
    res.status(500).send('Internal server error');
  }
});

// Update Booking Route
router.post('/update/:id', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const { event_date, event_type, customer_name, customer_email, customer_phone } = req.body;

    // Check if the new date is already booked by another booking
    if (event_date) {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          event_date: new Date(event_date),
          id: { not: bookingId }, // Exclude current booking
        },
      });

      if (existingBooking) {
        return res.status(400).send('The selected date is already booked by another event');
      }
    }

    // Update the booking
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        event_date: new Date(event_date),
        event_type,
        customer_name,
        customer_email,
        customer_phone: customer_phone || null,
      },
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Internal server error');
  }
});

// Cancel Booking Route
router.get('/cancel/:id', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
