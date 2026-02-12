const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
  getAllStores,
  rateStore,
  updatePassword
} = require('../controllers/user.controller');


router.get(
  '/stores',
  authMiddleware,
  roleMiddleware(['USER']),
  getAllStores
);


router.post(
  '/rate',
  authMiddleware,
  roleMiddleware(['USER']),
  rateStore
);


router.put(
  '/password',
  authMiddleware,
  roleMiddleware(['USER']),
  updatePassword
);

module.exports = router;
