import {
  AUCTION_RANDOM_REQUEST,
  AUCTION_RANDOM_SUCCESS,
  AUCTION_RANDOM_FAIL,
  AUCTION_MYAUCTIONS_REQUEST,
  AUCTION_MYAUCTIONS_SUCCESS,
  AUCTION_MYAUCTIONS_FAIL,
} from '../constants/auctionConstants'

export const auctionRandomReducer = (state = { auction: [] }, action) => {
  switch (action.type) {
    case AUCTION_RANDOM_REQUEST:
      return { loading: true, auction: [] }
    case AUCTION_RANDOM_SUCCESS:
      return { loading: false, auction: action.payload }
    case AUCTION_RANDOM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const myAuctionsReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_MYAUCTIONS_REQUEST:
      return { loading: true, auctions: [] }
    case AUCTION_MYAUCTIONS_SUCCESS:
      return { loading: false, auctions: action.payload }
    case AUCTION_MYAUCTIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
