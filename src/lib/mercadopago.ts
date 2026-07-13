import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// Inicializar cliente
export const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
  options: { timeout: 5000 }
});

export const preference = new Preference(client);
export const payment = new Payment(client);
