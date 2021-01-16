import { db } from '@/utils/firebase';

const handleBooking = async (req, res) => {
  // Record a new booking in the database:
  if (req.method === 'POST') {
    try {
      const booking = await db.collection('bookings').add(req.body);
      res.status(200).json({ bookingId: booking.id });
    } catch {
      res.status(400).end();
    }
    
  // Retrieve all bookings for admin:
  } else if (req.method === 'GET') {
    try {
      const bookings = [];
      const validatedBookings = [];
      // Retrieve new bookings:
      const bookingsCollec = await db.collection('bookings').get();
      bookingsCollec.forEach(booking => bookings.push({
        id: booking.id, 
        ...booking.data()
      }));
      // Retrieve filed bookings:
      const validatedBookingsCollec = await db.collection('filedBookings').get();
      validatedBookingsCollec.forEach(booking => validatedBookings.push({
        id: booking.id,
        ...booking.data()
      }));

      const totalBookings = {
        new: bookings,
        validated: validatedBookings
      };

      res.status(200).json(totalBookings);
    } catch {
      res.status(401).end();
    }

  // File a booking:
  } else if (req.method === 'PUT') {
    try {
      await db.collection('filedBookings').doc(req.body.id).set(req.body);
      await db.collection('bookings').doc(req.body.id).delete();
      res.status(200).end();
    } catch {
      res.status(401).end();
    }

  // Delete a booking:
  } else if (req.method === 'DELETE') {
    try {
      await db.collection('filedBookings').doc(req.body.id).delete();
      res.status(200).end();
    } catch {
      res.status(401).end();
    }

  // Other cases:
  } else {
    res.status(405).json({ message: `${req.method} requests are not authorized` });
  }
}

export default handleBooking;
