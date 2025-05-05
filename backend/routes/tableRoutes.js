const express = require('express');
const { createTable, getTables, updateTable, deleteTable } = require('../controllers/tableController');

const router = express.Router();

// rruget per tavolina
router.post('/', createTable);
router.get('/', getTables);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);

module.exports = router;
