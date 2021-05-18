import {
  AUCTION_RANDOM_REQUEST,
  AUCTION_RANDOM_SUCCESS,
  AUCTION_RANDOM_FAIL,
  AUCTION_MYAUCTIONS_REQUEST,
  AUCTION_MYAUCTIONS_SUCCESS,
  AUCTION_MYAUCTIONS_FAIL,
  AUCTION_CREATE_RESET,
  AUCTION_CREATE_REQUEST,
  AUCTION_CREATE_SUCCESS,
  AUCTION_CREATE_FAIL,
  AUCTION_DETAILS_REQUEST,
  AUCTION_DETAILS_SUCCESS,
  AUCTION_DETAILS_FAIL,
  AUCTION_UPDATE_REQUEST,
  AUCTION_UPDATE_SUCCESS,
  AUCTION_UPDATE_FAIL,
  AUCTION_UPDATE_RESET,
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_SUCCESS,
  AUCTION_DELETE_FAIL,
  AUCTION_LIST_REQUEST,
  AUCTION_LIST_SUCCESS,
  AUCTION_LIST_FAIL,
  AUCTION_BID_REQUEST,
  AUCTION_BID_SUCCESS,
  AUCTION_BID_FAIL,
} from '../constants/auctionConstants'

export const auctionListReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_LIST_REQUEST:
      return { loading: true, auctions: [] }
    case AUCTION_LIST_SUCCESS:
      return {
        loading: false,
        auctions: action.payload.auctions,
      }
    case AUCTION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

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

export const auctionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_CREATE_REQUEST:
      return { loading: true }
    case AUCTION_CREATE_SUCCESS:
      return { loading: false, success: true, auction: action.payload }
    case AUCTION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const auctionDetailsReducer = (state = { auction: [] }, action) => {
  switch (action.type) {
    case AUCTION_DETAILS_REQUEST:
      return { ...state, loading: true }
    case AUCTION_DETAILS_SUCCESS:
      return { loading: false, auction: action.payload }
    case AUCTION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const auctionUpdateReducer = (state = { auction: {} }, action) => {
  switch (action.type) {
    case AUCTION_UPDATE_REQUEST:
      return { loading: true }
    case AUCTION_UPDATE_SUCCESS:
      return { loading: false, success: true, auction: action.payload }
    case AUCTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_UPDATE_RESET:
      return { auction: {} }
    default:
      return state
  }
}

export const auctionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_DELETE_REQUEST:
      return { loading: true }
    case AUCTION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case AUCTION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const auctionBidReducer = (state = { auction: {} }, action) => {
  switch (action.type) {
    case AUCTION_BID_REQUEST:
      return { loading: true }
    case AUCTION_BID_SUCCESS:
      return { loading: false, success: true, auction: action.payload }
    case AUCTION_BID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
