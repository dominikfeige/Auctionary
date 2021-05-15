import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuctionCard from '../components/auctions/AuctionCard'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { listRandomAuction } from '../actions/auctionActions'
const HomeScreen = () => {
  const dispatch = useDispatch()

  const auctionRandom = useSelector((state) => state.auctionRandom)
  const { loading, error, auction } = auctionRandom

  useEffect(() => {
    dispatch(listRandomAuction())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {auction.map((auction) => (
            <AuctionCard auction={auction} />
          ))}
        </>
      )}
    </>
  )
}

export default HomeScreen
