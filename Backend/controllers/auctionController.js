import asyncHandler from 'express-async-handler'
import Auction from '../models/auctionModel.js'
import User from '../models/userModel.js'

// @desc    Get logged in auction
// @route   GET /api/auctions/myAuctions
// @access  Private
const getMyAuctions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('auctions')
  const auctions = await Auction.find({ _id: user.auctions }).sort({
    endDate: 1,
  })
  if (auctions && user) {
    res.json(auctions)
  } else {
    res.status(404)
    throw new Error('Auktion oder Benutzer nicht gefunden')
  }
})

// @desc    Bid on auction
// @route   PUT /api/auctions/myAuctions
// @access  Private
const putBidAuction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user.balance < req.body.currentBid) {
    res.status(403)
    throw new Error('Der Nutzer hat nicht genügend Guthaben!')
  } else {
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { currentBid: req.body.currentBid },
        lastBidBy: req.user.id,
      },
      { new: true }
    )

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      $inc: { balance: -req.body.currentBid },
      $addToSet: { auctions: updatedAuction.id },
    })

    if (updatedUser && updatedUser) {
      res.json({
        name: updatedAuction.name,
        image: updatedAuction.image,
        brand: updatedAuction.balance,
        lastBidBy: updatedAuction.lastBidBy,
        currentBid: updatedAuction.currentBid,
      })
    } else {
      res.status(404)
      throw new Error('Auktion nicht gefunden!')
    }
  }
})

// @desc    Create a auction
// @route   POST /api/auctions
// @access  Private/Admin
const postCreateAuction = asyncHandler(async (req, res) => {
  const auction = new Auction({
    name: 'Sample name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
  })

  const createdAuction = await auction.save()
  res.status(201).json(createdAuction)
})

// @desc    Delete a auction
// @route   DELETE /api/auctions/:id
// @access  Private/Admin
const deleteAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id)

  if (auction) {
    await auction.remove()
    res.json({ message: 'Auktion gelöscht' })
  } else {
    res.status(404)
    throw new Error('Auktion nicht gefunden')
  }
})
export { getMyAuctions, postCreateAuction, deleteAuction, putBidAuction }
