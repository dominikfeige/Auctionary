import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import {
  listAllAuctions,
  deleteAuction,
  createAuction,
} from '../actions/auctionActions'
import { AUCTION_CREATE_RESET } from '../constants/auctionConstants'
import Countdown, { zeroPad } from 'react-countdown'

const AuctionListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const auctionList = useSelector((state) => state.auctionList)
  const { loading, error, auctions } = auctionList

  const auctionDelete = useSelector((state) => state.auctionDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = auctionDelete

  const auctionCreate = useSelector((state) => state.auctionCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    auction: createdAuction,
  } = auctionCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: AUCTION_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/auction/${createdAuction._id}/edit`)
    } else {
      dispatch(listAllAuctions())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAuction,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Sind Sie sicher ?')) {
      dispatch(deleteAuction(id))
    }
  }

  const createAuctionHandler = () => {
    dispatch(createAuction())
  }

  // Complete Componente
  const Completionist = () => <span>Auktion fertig!</span>

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Auktionen</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAuctionHandler}>
            <i className='fas fa-plus'></i> Auktion erstellen
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>AUKTION-ID</th>
                <th>PRODUKT</th>
                <th>Marke</th>
                <th>Höchstbieter</th>
                <th>Gebot</th>
                <th>End Datum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => (
                <tr key={auction._id}>
                  <td>{auction._id}</td>
                  <td>{auction.name}</td>
                  <td>{auction.brand}</td>
                  <td>{auction.lastBidBy}</td>
                  <td>{auction.currentBid} €</td>
                  <td>
                    <Countdown date={auction.endDate} renderer={renderer} />
                  </td>
                  <td>
                    <LinkContainer to={`/admin/auction/${auction._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(auction._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default AuctionListScreen
