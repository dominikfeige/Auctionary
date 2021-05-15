import mongoose from 'mongoose'
import random from 'mongoose-random'

const auctionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      default: () => new Date(+new Date() + 60 * 60 * 1000),
    },
    currentBid: {
      type: Number,
      default: 0,
    },
    lastBidBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)
auctionSchema.plugin(random, { path: 'r' })

const Auction = mongoose.model('Auction', auctionSchema)

export default Auction
