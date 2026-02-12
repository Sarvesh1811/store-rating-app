const express=require('express');
const router=express.Router();

const authMiddleware=require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware');

const{

    addUser,
    addStore,
    getDashboardStats,
    getAllUsers,
    getAllStores
} = require('../controllers/admin.controller')

router.post(
    '/users',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    addUser
)

router.post(
  '/stores',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  addStore
);

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  getDashboardStats
);

router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  getAllUsers
);

router.get(
  '/stores',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  getAllStores
);

module.exports = router;