import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import FormContainer from '../components/shared/FormContainer'
import { updateUserBalance } from '../actions/userActions'

const AddBalanceScreen = ({ location, history }) => {
  const [balance, setBalance] = useState('0')

  const dispatch = useDispatch()

  const addUserBalance = useSelector((state) => state.addUserBalance)
  const { loading, error, info } = addUserBalance

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserBalance(balance))
  }

  return (
    <FormContainer>
      <h1>Guthaben aufladen</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {info && <Message variant='info'>{info}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='addBalance'>
          <Form.Label>Betrag: </Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setBalance(e.target.value)}
          >
            <option value='0' label='Betrag auswählen' />
            <option value='5'>5 €</option>
            <option value='10'>10 €</option>
            <option value='50'>50 €</option>
            <option value='100'>100 €</option>
            <option value='250'>250 €</option>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Aufladen
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddBalanceScreen
