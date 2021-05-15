import express from 'express'
const router = express.Router()

import {
  getMyAuctions,
  postCreateAuction,
  deleteAuction,
  putBidAuction,
  getRandomAuction,
} from '../controllers/auctionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postCreateAuction)
router.route('/myAuctions').get(protect, getMyAuctions)
router.route('/randomAuction').get(protect, getRandomAuction)
router
  .route('/:id')
  .delete(protect, admin, deleteAuction)
  .put(protect, putBidAuction)
export default router
