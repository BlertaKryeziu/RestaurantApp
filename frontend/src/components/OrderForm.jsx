// src/components/OrderForm.jsx
import { useState } from 'react';
import { createOrder } from '../api/orders';

const OrderForm = ({ tableId, onCreate }) => {
  const [itemsInput, setItemsInput] = useState('');
  const [waiterId, setWaiterId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = itemsInput.split(',').map(i => i.trim());
    try {
      const newOrder = await createOrder({
        table_id: tableId,
        items,
        total_price: 0,
        waiter_id: waiterId
      });
      onCreate(newOrder);
      setItemsInput('');
      setWaiterId('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 bg-gray-100 p-4 rounded-xl">
      <h3 className="font-semibold text-lg">Shto Porosi</h3>
      <input
        type="text"
        placeholder="Produkte, p.sh. pizza, cola"
        value={itemsInput}
        onChange={e => setItemsInput(e.target.value)}
        className="w-full p-2 rounded border"
        required
      />
      <input
        type="text"
        placeholder="ID e kamarierit"
        value={waiterId}
        onChange={e => setWaiterId(e.target.value)}
        className="w-full p-2 rounded border"
        required
      />
      <button
  type="submit"
  className="bg-transparent border border-green-500 text-black px-4 py-2 rounded hover:bg-green-200"
>
  Krijo Porosi
</button>
    </form>
  );
};

export default OrderForm;
