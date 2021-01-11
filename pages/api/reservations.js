import { db } from '@/utils/firebase';

const handleBooking = async (req, res) => {
  // Record a new booking in the database:
  if (req.method === 'POST') {
    try {
      const booking = await db.collection('bookings').add(req.body);
      res.status(200).json({ bookingId: booking.id });
    } catch(err) {
      res.status(400).json(err);
    }
    
  // Retrieve all bookings for admin:
  } else if (req.method === 'GET') {
    try {
      const bookings = [];
      const bookingsCollec = await db.collection('bookings').get();
      bookingsCollec.forEach(booking => bookings.push({
        id: booking.id, 
        ...booking.data()
      }));
      res.status(200).json({ bookings });
    } catch(err) {
      res.status(401).json(err);
    }
  } else {
    res.status(405).json({ message: `${req.method} requests are not authorized` });
  }
}

export default handleBooking;
