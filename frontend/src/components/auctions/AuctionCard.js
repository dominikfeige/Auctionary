import React from 'react'

import { Row, Container, Image } from 'react-bootstrap'

const AuctionCard = ({ auction }) => {
  return (
    <>
      <Container className='my-3 p-4 rounded '>
        <Row>
          <h1 className='m-auto p-1'>{auction.name}</h1>
        </Row>
        <Row>
          <Image className='m-auto p-1 w-50 border' src={auction.image} />
        </Row>
        <Row>
          <div className='m-auto p-1'>
            <h1>{auction.currentBid} €</h1>
          </div>
        </Row>
        <Row>
          <div className='m-auto p-1'> {auction.endDate}</div>
        </Row>
        <Row>
          <div className='m-auto p-1'></div>
        </Row>
      </Container>
    </>
  )
}
export default AuctionCard
