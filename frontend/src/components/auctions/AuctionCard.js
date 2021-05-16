import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'

import { Row, Container, Image } from 'react-bootstrap'

const AuctionCard = ({ auction }) => {
  // Complete Componente
  const Completionist = () => <span>Auktion abgeschlossen!</span>

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
          <div className='m-auto p-1'>
            <Countdown date={auction.endDate} renderer={renderer} />
          </div>
        </Row>
        <Row>
          <div className='m-auto p-1'></div>
        </Row>
      </Container>
    </>
  )
}
export default AuctionCard
