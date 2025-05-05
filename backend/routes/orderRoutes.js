const express = require('express');
const router = express.Router();

const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/ordercontroller');

// krijimi i nje porosie
router.post('/', createOrder);

// me i marr porosit per nje tavoline
router.get('/:tableId', getOrders);

// me bo update nje porosi
router.put('/:orderId', updateOrder);

// me fshi nje porosi
router.delete('/:orderId', deleteOrder);

module.exports = router;
