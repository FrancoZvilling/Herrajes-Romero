// native fetch

async function check() {
  const token = 'APP_USR-4792116004193634-071008-aaf7578e9aef0514850b0e66a17f53c3-3533986826';
  const res = await fetch('https://api.mercadopago.com/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("Datos de la cuenta vendedora:", data);
}

check();
