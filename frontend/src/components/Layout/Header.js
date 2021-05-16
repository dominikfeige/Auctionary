import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import mainLogo from '../../../src/assets/logoSmall.svg'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container>
          {userInfo && (
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
          )}
          {!userInfo && (
            <LinkContainer to='/login'>
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
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/auctionlist'>
                <NavDropdown.Item>Auktionen</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo && (
                <LinkContainer to='/addBalance'>
                  <Nav.Link>
                    <i class='fas fa-money-bill'></i> {userInfo.balance} €
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <LinkContainer to='/myAuctions'>
                  <Nav.Link>
                    <i className='fas fa-gavel'></i> Meine Auktionen
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <Nav.Link onClick={logoutHandler}>
                  <i className='fas fa-user-alt'></i> ({userInfo.email})
                  Abmelden
                </Nav.Link>
              )}
              {!userInfo && (
                <LinkContainer to='/register'>
                  <Nav.Link>
                    <i class='fas fa-user-plus'></i> Registrieren
                  </Nav.Link>
                </LinkContainer>
              )}
              {!userInfo && (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user-alt'></i> Anmelden
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
