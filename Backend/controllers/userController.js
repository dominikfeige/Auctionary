import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Benutzer existiert bereits')
  }

  const user = await User.create({
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      balance: user.balance,
      isAdmin: user.isAdmin,
      auctions: user.auctions,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Fehlerhafte Benutzerdaten')
  }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      balance: user.balance,
      isAdmin: user.isAdmin,
      auctions: user.auctions,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Falsche E-Mail Adresse oder falsches Passwort')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      balance: user.balance,
      isAdmin: user.isAdmin,
      auctions: user.auctions,
    })
  } else {
    res.status(404)
    throw new Error('Benutzer nicht gefunden')
  }
})

// @desc    Add User Balance
// @route   PUT /api/users/profile/addBalance
// @access  Private
const putAddUserBalance = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $inc: { balance: req.body.balance },
    },
    { new: true }
  )

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      balance: user.balance,
      isAdmin: user.isAdmin,
      auctions: user.auctions,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('Benutzer nicht gefunden')
  }
})

export { registerUser, authUser, getUserProfile, putAddUserBalance }
