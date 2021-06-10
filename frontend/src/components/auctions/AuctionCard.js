import React, { useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import Loader from '../shared/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { bidAuction } from '../../actions/auctionActions'
import { getUserDetails } from '../../actions/userActions'
import {
  Row,
  Container,
  Image,
  InputGroup,
  Button,
  Form,
} from 'react-bootstrap'

const AuctionCard = ({ auction }) => {
  const [bid, setBid] = useState('0')

  const dispatch = useDispatch()

  const auctionBid = useSelector((state) => state.auctionBid)
  const { loading } = auctionBid

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(bidAuction(bid, auction)).then(() => dispatch(getUserDetails()))
  }

  // Complete Componente
  const Completionist = () => (
    <Container>
      {userInfo._id === auction.lastBidBy ? (
        <Row>
          <h2>
            <i className='text-warning fas fa-trophy'></i>
          </h2>
          <h5 className='m-auto p-1'>
            Sie haben die Auktion mit {auction.currentBid} € gewonnen!
          </h5>
        </Row>
      ) : (
        <Row>
          <h2>
            <i className='text-danger far fa-times-circle'></i>
          </h2>
          <h5 className='m-auto p-1'>Sie haben verloren!</h5>
        </Row>
      )}
    </Container>
  )

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          <h6>Verbleibende Zeit</h6>
          {zeroPad(minutes)}:{zeroPad(seconds)}
          {userInfo._id === auction.lastBidBy ? (
            <Row>
              <div className='m-auto p-1 text-center'>
                <h5 className='m-auto p-1'>Sie sind aktuell Höchstbieter!</h5>
                <h2>
                  <i className='fas fa-check text-success m-auto'></i>
                </h2>
              </div>
            </Row>
          ) : (
            <Container className='text-center'>
              <Row className='m-auto w-25'>
                <Form onSubmit={submitHandler}>
                  <InputGroup className='p-1'>
                    <Form.Control
                      type='number'
                      min='0'
                      placeholder='Gebot'
                      value={bid}
                      onChange={(e) => setBid(e.target.value)}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text> €</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <Button
                    className='m-2'
                    type='submit'
                    variant='btn btn-success'
                  >
                    Bieten
                  </Button>
                </Form>
              </Row>
            </Container>
          )}
        </span>
      )
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container className='my-3 p-3 w-50 rounded card text-center bg-light rounded'>
            <Row>
              <h6 className='m-auto p-1'>Produkt</h6>
            </Row>
            <Row>
              <h3 className='m-auto p-1'>{auction.name}</h3>
            </Row>
            <Row>
              <div className='m-auto p-1'>
                <Image
                  className='auction-photo p-1 img-fluid border'
                  src={auction.image}
                />
              </div>
            </Row>
            <Row>
              <h6 className='m-auto p-1'>Aktuelles Gebot</h6>
            </Row>
            <Row>
              <div className='m-auto p-1 text-center'>
                <h4>{auction.currentBid}€</h4>
              </div>
            </Row>

            <Row>
              <div className='m-auto p-1'>
                <h5>
                  <Countdown
                    date={auction.endDate}
                    renderer={renderer}
                  ></Countdown>
                </h5>
              </div>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}
export default AuctionCard
