import express from 'express'
const router = express.Router()

import {
  getMyAuctions,
  postCreateAuction,
  deleteAuction,
  putBidAuction,
  getRandomAuction,
  putUpdateAuction,
  getAuctionById,
  getAllAuctions,
} from '../controllers/auctionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postCreateAuction)
router.route('/admin').get(protect, admin, getAllAuctions)
router.route('/myAuctions').get(protect, getMyAuctions)
router.route('/randomAuction').get(protect, getRandomAuction)
router
  .route('/:id')
  .get(protect, getAuctionById)
  .delete(protect, admin, deleteAuction)
  .put(protect, putBidAuction)
router.route('/:id/edit').put(protect, admin, putUpdateAuction)
export default router
