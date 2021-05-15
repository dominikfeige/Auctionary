import asyncHandler from 'express-async-handler'
import Auction from '../models/auctionModel.js'
import User from '../models/userModel.js'

// @desc    Get logged in auction
// @route   GET /api/auctions/myAuctions
// @access  Private
const getMyAuctions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('auctions')
  const auctions = await Auction.find({ _id: user.auctions }, { r: 0 }).sort({
    endDate: 1,
  })
  if (auctions && user) {
    res.json(auctions)
  } else {
    res.status(404)
    throw new Error('Auktion oder Benutzer nicht gefunden')
  }
})

// @desc    Get one random auction
// @route   GET /api/auctions/randomAuction
// @access  Private
const getRandomAuction = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id).select('auctions')

  let randomAuction
  if (currentUser.auctions.length >= 1) {
    randomAuction = await Auction.findRandom(
      {
        _id: { $nin: currentUser.auctions },
      },
      { r: 0 }
    ).limit(1)
  } else {
    randomAuction = await Auction.findRandom({}, { r: 0 }).limit(1)
  }
  if (randomAuction) {
    res.json(randomAuction)
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
  const users = await User.updateMany(
    { auctions: req.params.id },
    { $pull: { auctions: req.params.id } }
  )

  console.log(users)

  if (auction) {
    await auction.remove()
    res.json({ message: 'Auktion wurde erfolgreich gelöscht' })
  } else {
    res.status(404)
    throw new Error('Auktion nicht gefunden')
  }
})
export {
  getMyAuctions,
  postCreateAuction,
  deleteAuction,
  putBidAuction,
  getRandomAuction,
}
