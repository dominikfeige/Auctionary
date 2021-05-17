import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'

import { Row, Container, Image } from 'react-bootstrap'

const AuctionCard = ({ auction }) => {
  // Complete Componente
  const Completionist = () => (
    <Container>
      <Row>
        <h1 className='m-auto p-1'>Gewinner!</h1>
      </Row>
      <Row>
        <h1 className='m-auto p-1'>
          <i className='fas fa-trophy text-warning'>{auction.id}</i>
        </h1>
      </Row>

      <Row>
        <h1 className='m-auto p-1'>Verlierer!</h1>
      </Row>
      <Row>
        <h1 className='m-auto p-1'>
          <i class='fas fa-skull-crossbones text-info'>{auction.id}</i>
        </h1>
      </Row>
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
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )
    }
  }

  return (
    <>
      <Container className='my-3 p-4 rounded '>
        <Row>
          <h6 className='m-auto p-1'>Produkt</h6>
        </Row>
        <Row>
          <h1 className='m-auto p-1'>{auction.name}</h1>
        </Row>

        <Row>
          <Image className='m-auto p-1 w-50 border' src={auction.image} />
        </Row>

        <Row>
          <h6 className='m-auto p-1'>Aktuelles Gebot</h6>
        </Row>
        <Row>
          <div className='m-auto p-1 text-center'>
            <h1>{auction.currentBid}€</h1>
          </div>
        </Row>

        <Row>
          <div className='m-auto p-1'>
            <h4>
              <Countdown date={auction.endDate} renderer={renderer}>
                {' '}
                <Row>
                  <h6 className='m-auto p-1'>Verbleibende Zeit</h6>
                </Row>
              </Countdown>
            </h4>
          </div>
        </Row>

        <Row>
          <h6 className='m-auto p-1'>Höchstbietender</h6>
        </Row>
        <Row>
          <h1 className='m-auto p-1'>
            <i className='fas fa-check text-success'></i>
            <i className='fas fa-times text-danger'></i>
          </h1>
        </Row>
      </Container>
    </>
  )
}
export default AuctionCard
