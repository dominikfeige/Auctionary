import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuctionCard from '../components/auctions/AuctionCard'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { Row, Container, Button } from 'react-bootstrap'
import { listRandomAuction } from '../actions/auctionActions'
const HomeScreen = () => {
  const dispatch = useDispatch()

  const auctionRandom = useSelector((state) => state.auctionRandom)
  const { loading, error, auction } = auctionRandom

  useEffect(() => {
    dispatch(listRandomAuction())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(listRandomAuction())
  }

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
          <Container className='text-center'>
            <Row>
              <Container className='text-center px-1'>
                <Button
                  onClick={submitHandler}
                  className='btn btn-danger mx-1'
                  type='button'
                >
                  Nächster Artikel
                </Button>
              </Container>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default HomeScreen
