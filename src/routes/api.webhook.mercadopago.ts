import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export const APIRoute = createAPIFileRoute('/api/webhook/mercadopago')({
  POST: async ({ request }) => {
    try {
      const url = new URL(request.url)
      let type = url.searchParams.get('type') || url.searchParams.get('topic')
      let id = url.searchParams.get('data.id') || url.searchParams.get('id')

      if (!type || !id) {
        try {
          const body = await request.json()
          type = type || body.type || body.topic || body.action?.split('.')[0]
          id = id || body.data?.id || body.id
        } catch (e) {
          // Body not JSON or empty
        }
      }

      if ((type === 'payment' || type === 'merchant_order') && id) {
        // Initialize MP
        const client = new MercadoPagoConfig({
          accessToken: process.env.MP_ACCESS_TOKEN || '',
          options: { timeout: 5000 }
        })

        if (type === 'payment') {
          const payment = new Payment(client)
          const paymentInfo = await payment.get({ id })
          
          if (paymentInfo.status === 'approved' && paymentInfo.external_reference) {
            // Update the order in Firestore
            const orderId = paymentInfo.external_reference
            const orderRef = doc(db, 'orders', orderId)
            
            await updateDoc(orderRef, {
              status: 'approved',
              paymentId: paymentInfo.id,
              paymentType: paymentInfo.payment_type_id
            })
            
            console.log(`Order ${orderId} marked as approved.`)
          }
        }
      }

      return new Response('OK', { status: 200 })
    } catch (error: any) {
      console.error('Webhook error:', error)
      return new Response(error.message, { status: 500 })
    }
  }
})
