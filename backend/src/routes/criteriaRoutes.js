const express = require('express');
const router = express.Router();

const {
  createCriteria,
  listCriteria,
  updateCriteria,
  deleteCriteria
} = require('../controllers/criteriaController');

router.post('/', createCriteria);
router.get('/', listCriteria);
router.put('/:id', updateCriteria);
router.delete('/:id', deleteCriteria);

module.exports = router;
