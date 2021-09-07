import React, { useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  deliverOrder,
  toPayOrder,
} from '../actions/orderActions'
import {
  ORDER_DELIVER_RESET,
  ORDER_TO_PAY_RESET,
} from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderToPay = useSelector((state) => state.orderToPay)
  const { loading: loadingToPay, success: successToPay } = orderToPay

  if (!loading) {
    // Calculate itemsPrice
    const addDecimals = (n) => {
      return (Math.round(n * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!order || successDeliver || successToPay) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_TO_PAY_RESET })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, history, userInfo, order, id, successDeliver, successToPay])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const toPayHandler = () => {
    dispatch(toPayOrder(id))
    history.push(`/order/:${id}/topay`)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title='Order confirmation & payment' />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>E-mail: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Out to delivery on: {order.deliveredAt}
                </Message>
              ) : (
                <Message>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid && order.paymentMethod === 'PayPal' && (
                <Message variant='success'>
                  Payment: {order.paidAt} {order.paidAt}
                </Message>
              )}
              {order.isPaid && order.paymentMethod === 'onDelivery' && (
                <Message variant='success'>
                  Payment: {order.paidOn} {order.paidAt}
                </Message>
              )}
              {!order.isPaid && <Message>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='info'>Order is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row className='rowOrder'>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = $ {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered &&
                order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
          {loadingToPay && <Loader />}
          {userInfo &&
            !userInfo.isAdmin &&
            !order.isDelivered &&
            !order.isPaid &&
            order.paymentMethod === 'onDelivery' && (
              <Button
                type='button'
                className='btn btn-primary my-3'
                onClick={toPayHandler}
              >
                Confirm Your Order
              </Button>
            )}{' '}
          {userInfo &&
            !userInfo.isAdmin &&
            !order.isDelivered &&
            !order.isPaid &&
            order.paymentMethod === 'PayPal' && (
              <Button className='btn btn-primary my-3 '>PayPal</Button>
            )}
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
