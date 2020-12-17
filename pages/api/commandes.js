import { db } from '@/utils/firebase';

const handleOrder = async (req, res) => {
  // Record a new order in the database:
  if (req.method === 'POST') {
    const order = await db.collection('orders').add(req.body);
    res.status(200).json({ orderId: order.id });
  // Retrieve all orders for admin:
  } else if (req.method === 'GET') {
    const orders = [];
    const ordersCollec = await db.collection('orders').get();
    ordersCollec.forEach(order => orders.push({
      id: order.id, 
      ...order.data()
    }));
    res.status(200).json({ orders });

  } else {
    res.status(403).json({ message: `${req.method} requests are not authorized` });
  }
}

export default handleOrder;
