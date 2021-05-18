import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AuctionCard from '../components/auctions/AuctionCard'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { listMyAuctions } from '../actions/auctionActions'
const MyAuctionsScreen = () => {
  const dispatch = useDispatch()

  const myAuctions = useSelector((state) => state.myAuctions)
  const { loading, error, auctions } = myAuctions

  useEffect(() => {
    dispatch(listMyAuctions())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : auctions.length === 0 ? (
        <Message variant='info'>
          Sie haben auf keine <Link to='/'>Auktion</Link> geboten.
        </Message>
      ) : (
        <>
          <Row>
            {auctions.map((auction) => (
              <Col sm={12} md={6} lg={6} xl={6} key={auction._id}>
                <AuctionCard auction={auction} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default MyAuctionsScreen
