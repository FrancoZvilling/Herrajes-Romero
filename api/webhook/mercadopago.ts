import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Initialize Firebase using process.env for Node.js environment
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const type = req.query.type || req.query.topic || req.body?.type || req.body?.topic || req.body?.action?.split('.')[0];
    const id = req.query['data.id'] || req.query.id || req.body?.data?.id || req.body?.id;

    if ((type === 'payment' || type === 'merchant_order') && id) {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN || '',
        options: { timeout: 5000 }
      });

      if (type === 'payment') {
        const payment = new Payment(client);
        const paymentInfo = await payment.get({ id });
        
        if (paymentInfo.status === 'approved' && paymentInfo.external_reference) {
          const orderId = paymentInfo.external_reference;
          const orderRef = doc(db, 'orders', orderId);
          
          await updateDoc(orderRef, {
            status: 'approved',
            paymentId: paymentInfo.id,
            paymentType: paymentInfo.payment_type_id
          });
          
          console.log(`Order ${orderId} marked as approved.`);
        }
      }
    }

    return res.status(200).send('OK');
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(500).send(error.message);
  }
}
