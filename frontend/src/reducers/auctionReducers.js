import {
  AUCTION_RANDOM_REQUEST,
  AUCTION_RANDOM_SUCCESS,
  AUCTION_RANDOM_FAIL,
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
