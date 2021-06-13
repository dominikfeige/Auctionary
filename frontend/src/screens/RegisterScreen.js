import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import FormContainer from '../components/shared/FormContainer'
import { register } from '../actions/userActions'
import { toast } from 'react-toastify'

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein')
    } else {
      dispatch(register(email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Registrieren</h1>
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>E-Mail Adresse</Form.Label>
          <Form.Control
            type='email'
            placeholder='E-Mail Adresse eingeben'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type='password'
            placeholder='Passwort eingeben'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Passwort bestätigen</Form.Label>
          <Form.Control
            type='password'
            placeholder='Passwort bestätigen'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          className='my-2 btn btn-success'
          variant='primary'
        >
          Registrieren
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Sie haben bereits ein Profil?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Anmelden
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
