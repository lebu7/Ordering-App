import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto'; // Node.js built-in crypto module

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY; // Replace with your Paystack secret key

export default async function handler(req, res) {
  const buff = Buffer.from(JSON.stringify(req.body), 'utf-8');
  const signature = req.headers['x-paystack-signature']?.toString();

  if (!paystackSecretKey || !signature) {
    console.error('Missing Paystack secret key or signature');
    return res.status(400).json({ message: 'Missing secret key or signature' });
  }

  const hash = crypto.createHmac('sha512', paystackSecretKey).update(buff).digest('hex');

  if (hash !== signature) {
    console.error('Invalid Paystack webhook signature');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = req.body;

  switch (event.event) {
    case 'charge.success':
      // Handle successful payment event
      const transactionId = event.data.id;
      await updateOrderPaidStatus(transactionId); // Update order to paid
      console.log(`Order with transaction ID ${transactionId} marked as paid.`);
      res.status(200).json({ message: 'Success' });
      break;
    case 'paymentrequest.pending':
    case 'paymentrequest.success':
    case 'refund.failed':
    case 'refund.pending':
    case 'refund.processed':
    case 'refund.processing':
      // Handle other relevant Paystack events (optional)
      console.log('Received Paystack webhook event:', event);
      res.status(200).json({ message: 'Received' });
      break;
    default:
      console.warn('Unhandled Paystack webhook event:', event);
      res.status(200).json({ message: 'Unhandled event' });
  }
}

async function updateOrderPaidStatus(transactionId) {
  const connection = await connection; // Assuming you have a connection function

  try {
    const order = await Order.findOneAndUpdate(
      { orderId: transactionId },
      { paid: true },
      { new: true } // Return the updated document
    );

    if (!order) {
      console.warn(`Order with transaction ID ${transactionId} not found.`);
      return;
    }

    console.log(`Order ${order._id} with transaction ID ${transactionId} marked as paid.`);
  } catch (error) {
    console.error('Error updating order paid status:', error);
  } finally {
    // Close the connection if necessary (depending on your connection logic)
    await connection.close();
  }
}
