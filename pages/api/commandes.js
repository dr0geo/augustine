import { db } from '@/utils/firebase';

const handleOrder = async (req, res) => {
  // Record a new order in the database:
  if (req.method === 'POST') {
    try {
      const order = await db.collection('orders').add(req.body);
      res.status(200).json({ orderId: order.id });
    } catch (err) {
      res.status(400).json(err);
    }
    
  // Retrieve all orders for admin:
  } else if (req.method === 'GET') {
    try {
      const orders = [];
      const ordersCollec = await db.collection('orders').get();
      ordersCollec.forEach(order => orders.push({
        id: order.id, 
        ...order.data()
      }));
      res.status(200).json({ orders });
    } catch (err) {
      res.status(401).json(err);
    }
  } else {
    res.status(405).json({ message: `${req.method} requests are not authorized` });
  }
}

export default handleOrder;
