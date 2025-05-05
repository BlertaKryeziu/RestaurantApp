const {
  createOrder: createOrderModel,
  getOrders: getOrdersModel,
  updateOrder: updateOrderModel,
  deleteOrder: deleteOrderModel
} = require('../models/Order');

// Krijimi i një porosie
exports.createOrder = async (req, res) => {
  try {
    const { table_id, items, total_price, waiter_id } = req.body;
    const newOrder = await createOrderModel(
      table_id,
      items,
      total_price,
      waiter_id
    );
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Marrja e porosive për një tavolinë
exports.getOrders = async (req, res) => {
  try {
    const { tableId } = req.params;
    const orders = await getOrdersModel(tableId);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Përditësimi i një porosie
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items, total_price, status } = req.body;
    const updated = await updateOrderModel(
      orderId,
      items,
      total_price,
      status
    );
    res.json(updated);
  } catch (err) {
    console.error('Error updating order:', err.message);
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Fshirja e një porosie
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await deleteOrderModel(orderId);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
