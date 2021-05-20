import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import FormContainer from '../components/shared/FormContainer'
import { listAuctionDetails, updateAuction } from '../actions/auctionActions'
import { AUCTION_UPDATE_RESET } from '../constants/auctionConstants'

const AuctionEditScreen = ({ match, history }) => {
  const auctionId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const auctionDetails = useSelector((state) => state.auctionDetails)
  const { loading, error, auction } = auctionDetails

  const auctionUpdate = useSelector((state) => state.auctionUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = auctionUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AUCTION_UPDATE_RESET })
      history.push('/admin/auctionlist')
    } else {
      if (!auction.name || auction._id !== auctionId) {
        dispatch(listAuctionDetails(auctionId))
      } else {
        setName(auction.name)
        setBrand(auction.brand)
        setImage(auction.image)
      }
    }
  }, [dispatch, history, auctionId, auction, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateAuction({
        _id: auctionId,
        name,
        brand,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/auctionlist' className='btn btn-light my-3'>
        Zurück
      </Link>
      <FormContainer>
        <h1>Auktion Bearbeiten</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Produkt</Form.Label>
              <Form.Control
                type='name'
                placeholder='Produkt eingeben'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Marke</Form.Label>
              <Form.Control
                type='text'
                placeholder='Marke eingeben'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Bild</Form.Label>
              <Form.Control
                type='text'
                placeholder='Bild URL eingeben'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button
              className='my-2 btn btn-success'
              type='submit'
              variant='primary'
            >
              Speichern
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AuctionEditScreen
