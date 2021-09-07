import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className='my-5 p-3 rounded cardy'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ height: '20rem' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            {product.name.length < 20 && <strong>{product.name}</strong>}
            {product.name.length >= 20 && (
              <strong>{product.name.substring(0, 20)}...</strong>
            )}
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          {product.author.length < 10 && (
            <h6>
              by <strong>{product.author}</strong>
            </h6>
          )}
          {product.author.length >= 10 && (
            <h6>
              by <strong>{product.author.substring(0, 10)}...</strong>
            </h6>
          )}
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            rating={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>
          <div className='my-3'>
            <h5>{product.price} $</h5>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
