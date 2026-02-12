const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
  getOwnerStores,
  getStoreRatings,
  getStoreSummary
} = require('../controllers/owner.controller');

router.get(
  '/stores',
  authMiddleware,
  roleMiddleware(['OWNER']),
  getOwnerStores
);

router.get(
  '/ratings',
  authMiddleware,
  roleMiddleware(['OWNER']),
  getStoreRatings
);

router.get(
  '/summary',
  authMiddleware,
  roleMiddleware(['OWNER']),
  getStoreSummary
);

module.exports = router;
