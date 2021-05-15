import React, { useContext } from 'react'
import { Navbar, Nav, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import mainLogo from '../../../src/assets/logoSmall.svg'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src={mainLogo}
                width='75'
                height='75'
                className='d-inline-block align-top'
                alt='Auctionary logo'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/addBalance'>
                <Nav.Link>
                  <i class='fas fa-money-bill'></i> 20 €
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/myAuctions'>
                <Nav.Link>
                  <i className='fas fa-gavel'></i> Meine Auktionen
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link>
                  <i class='fas fa-user-plus'></i> Registrieren
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user-alt'></i> Anmelden
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
