import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  UpdateOrderToDelivered,
  UpdateOrderToPay,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/topay').put(protect, UpdateOrderToPay)
router.route('/:id/deliver').put(protect, admin, UpdateOrderToDelivered)

export default router
