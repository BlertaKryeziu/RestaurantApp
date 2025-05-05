const BASE = 'http://localhost:5000/api/orders';

// Funksioni per te marre porosite per nje tavoline

export const fetchOrders = async (tableId) => {
  try {
    const res = await fetch(`${BASE}/${tableId}`);
    if (!res.ok) throw new Error('Error while getting orders');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    throw err;
  }
};

// Funksioni per te krijuar nje porosi te re
export const createOrder = async (orderData) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Error creating order');
  return res.json();
};
