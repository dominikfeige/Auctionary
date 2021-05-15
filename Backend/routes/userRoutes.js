import express from 'express'
const router = express.Router()

import {
  registerUser,
  authUser,
  getUserProfile,
  putAddUserBalance,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile/addBalance').put(protect, putAddUserBalance)

export default router
