import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

//Layout Components
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MyAuctionsScreen from './screens/MyAuctionsScreen'
import AddBalanceScreen from './screens/AddBalanceScreen'
import AuctionEditScreen from './screens/AuctionEditScreen'
import AuctionListScreen from './screens/AuctionListScreen'
import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
          />
          <Route path='/myAuctions' component={MyAuctionsScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/addBalance' component={AddBalanceScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/admin/auction/:id/edit' component={AuctionEditScreen} />
          <Route
            path='/admin/auctionlist'
            component={AuctionListScreen}
            exact
          />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
