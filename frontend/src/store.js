import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateBalanceReducer,
} from './reducers/userReducers'
import {
  auctionRandomReducer,
  myAuctionsReducer,
  auctionCreateReducer,
  auctionDeleteReducer,
  auctionDetailsReducer,
  auctionUpdateReducer,
  auctionListReducer,
  auctionBidReducer,
} from './reducers/auctionReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  auctionRandom: auctionRandomReducer,
  myAuctions: myAuctionsReducer,
  userAddBalance: userUpdateBalanceReducer,
  getUserDetails: userDetailsReducer,
  auctionCreate: auctionCreateReducer,
  auctionDelete: auctionDeleteReducer,
  auctionDetails: auctionDetailsReducer,
  auctionUpdate: auctionUpdateReducer,
  auctionList: auctionListReducer,
  auctionBid: auctionBidReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
