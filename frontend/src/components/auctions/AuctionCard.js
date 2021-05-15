import React from 'react'

import { Row, Container, Image, Button, ListGroup } from 'react-bootstrap'

const AuctionCard = ({ auction }) => {
  return (
    <>
      <Container className='my-3 p-4 rounded '>
        <Row>
          <Image className='m-auto p-1 w-50 border' src={auction.image} />
        </Row>
        <Row>
          <h4 className='m-auto p-1'>{auction.name}</h4>
        </Row>
        <Row>
          <div className='m-auto p-1'>{auction.endDate}</div>
        </Row>
        <Row>
          <div className='m-auto p-1'>{auction.currentBid} €</div>
        </Row>
        <Row>
          <div className='m-auto p-1'>
            <ListGroup>
              <ListGroup.Item>
                <Button className='btn btn-success mx-1' type='button'>
                  5€
                </Button>
                <Button className='btn btn-success mx-1' type='button'>
                  10€
                </Button>
                <Button className='btn btn-success mx-1' type='button'>
                  50€
                </Button>
              </ListGroup.Item>
              <ListGroup.Item className='text-center'>
                <Button className='btn btn-danger mx-1' type='button'>
                  Nächster Artikel
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Row>
      </Container>
    </>
  )
}
export default AuctionCard
