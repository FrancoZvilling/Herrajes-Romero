import { MercadoPagoConfig, Preference } from 'mercadopago';

const accessToken = "APP_USR-4792116004193634-071008-aaf7578e9aef0514850b0e66a17f53c3-3533986826";

const client = new MercadoPagoConfig({
  accessToken: accessToken,
  options: { timeout: 5000 }
});
const preference = new Preference(client);

preference.create({
  body: {
    items: [{
      id: "test",
      title: "Prueba",
      quantity: 1,
      unit_price: 100,
      currency_id: 'ARS',
    }],
    back_urls: {
      success: "http://127.0.0.1:8080/checkout/success",
      pending: "http://127.0.0.1:8080/checkout/pending",
      failure: "http://127.0.0.1:8080/checkout/failure",
    },
    // auto_return: "approved",
  }
}).then(res => {
  console.log("ÉXITO:", res.init_point);
}).catch(err => {
  console.error("ERROR:", err);
});
