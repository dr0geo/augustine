import { db } from '@/utils/firebase';

const handleOrder = async (req, res) => {
  // Record a new order in the database:
  if (req.method === 'POST') {
    try {
      const order = await db.collection('orders').add(req.body);
      res.status(200).json({ orderId: order.id });
    } catch {
      res.status(400).end();
    }
    
  // Retrieve all orders for admin:
  } else if (req.method === 'GET') {
    try {
      const orders = [];
      const validatedOrders = [];
      // Retrieve new orders:
      const ordersCollec = await db.collection('orders').get();
      ordersCollec.forEach(order => orders.push({
        id: order.id, 
        ...order.data()
      }));
      // Retrieve filed orders:
      const validatedOrdersCollec = await db.collection('filedOrders').get();
      validatedOrdersCollec.forEach(order => validatedOrders.push({
        id: order.id,
        ...order.data()
      }));

      const totalOrders = {
        new: orders,
        validated: validatedOrders
      };

      res.status(200).json(totalOrders);
    } catch {
      res.status(401).end();
    }
  
  // File an order:
  } else if (req.method === 'PUT') {
    try {
      await db.collection('filedOrders').doc(req.body.id).set(req.body);
      await db.collection('orders').doc(req.body.id).delete();
      res.status(200).end();
    } catch {
      res.status(401).end();
    }

  // Delete an order:
  } else if (req.method === 'DELETE') {
    try {
      await db.collection('filedOrders').doc(req.body.id).delete();
      res.status(200).end();
    } catch {
      res.status(401).end();
    }

  // Other cases:
  } else {
    res.status(405).json({ message: `${req.method} requests are not authorized` });
  }
}

export default handleOrder;
