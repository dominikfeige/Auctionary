import axios from 'axios'
import {
  AUCTION_RANDOM_REQUEST,
  AUCTION_RANDOM_SUCCESS,
  AUCTION_RANDOM_FAIL,
  AUCTION_MYAUCTIONS_REQUEST,
  AUCTION_MYAUCTIONS_SUCCESS,
  AUCTION_MYAUCTIONS_FAIL,
  AUCTION_CREATE_REQUEST,
  AUCTION_CREATE_SUCCESS,
  AUCTION_CREATE_FAIL,
  AUCTION_DETAILS_REQUEST,
  AUCTION_DETAILS_SUCCESS,
  AUCTION_DETAILS_FAIL,
  AUCTION_UPDATE_REQUEST,
  AUCTION_UPDATE_SUCCESS,
  AUCTION_UPDATE_FAIL,
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
import { logout } from './userActions'

export const listAllAuctions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUCTION_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/admin`, config)

    dispatch({
      type: AUCTION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUCTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRandomAuction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUCTION_RANDOM_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/randomAuction`, config)

    dispatch({
      type: AUCTION_RANDOM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUCTION_RANDOM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyAuctions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUCTION_MYAUCTIONS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/myAuctions`, config)

    dispatch({
      type: AUCTION_MYAUCTIONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUCTION_MYAUCTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAuctionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AUCTION_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/${id}`, config)

    dispatch({
      type: AUCTION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUCTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createAuction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/auctions`, {}, config)

    dispatch({
      type: AUCTION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Token fehlerhaft') {
      dispatch(logout())
    }
    dispatch({
      type: AUCTION_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateAuction = (auction) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/auctions/${auction._id}/edit`,
      auction,
      config
    )

    dispatch({
      type: AUCTION_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: AUCTION_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Token fehlerhaft') {
      dispatch(logout())
    }
    dispatch({
      type: AUCTION_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteAuction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/auctions/${id}`, config)

    dispatch({
      type: AUCTION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Token fehlerhaft') {
      dispatch(logout())
    }
    dispatch({
      type: AUCTION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const bidAuction = (bid, auction) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_BID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/auctions/${auction._id}`,
      { bid },
      config
    )

    dispatch({
      type: AUCTION_BID_SUCCESS,
      payload: data,
    })
    dispatch({
      type: AUCTION_RANDOM_SUCCESS,
      payload: [data],
    })
    dispatch({
      type: AUCTION_MYAUCTIONS_SUCCESS,
      payload: [data],
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Token fehlerhaft') {
      dispatch(logout())
    }
    dispatch({
      type: AUCTION_BID_FAIL,
      payload: message,
    })
  }
}
