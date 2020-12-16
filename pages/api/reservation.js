import { db } from '@/utils/firebase';

const handleBooking = async (req, res) => {
  const booking = await db.collection('bookings').add(req.body);

  res.status(200).json({ bookingId: booking.id });
}

export default handleBooking;
