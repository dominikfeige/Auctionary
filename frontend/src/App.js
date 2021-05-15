import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

//Layout Components
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact />
          <Route path='/myAuctions' />
          <Route path='/login' />
          <Route path='/register' />
          <Route path='/auction' />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
