import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import FormContainer from '../components/shared/FormContainer'
import { updateUserBalance } from '../actions/userActions'

const AddBalanceScreen = () => {
  const [balance, setBalance] = useState('5')

  const dispatch = useDispatch()

  const userAddBalance = useSelector((state) => state.userAddBalance)
  const { loading, error } = userAddBalance

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserBalance(balance))
  }

  return (
    <>
      <FormContainer>
        <h2 className='text-center'>Guthaben aufladen</h2>
        <Container className='text-start'>
          {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Label>Betrag</Form.Label>
            <Form.Group controlId='addBalance'>
              <Form.Control
                as='select'
                onChange={(e) => setBalance(e.target.value)}
              >
                <option value='5'>5 €</option>
                <option value='10'>10 €</option>
                <option value='50'>50 €</option>
                <option value='100'>100 €</option>
                <option value='250'>250 €</option>
              </Form.Control>
            </Form.Group>

            <Button className='my-2 btn btn-success' type='submit'>
              Aufladen
            </Button>
          </Form>
        </Container>
      </FormContainer>
    </>
  )
}

export default AddBalanceScreen
