import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderConfirmed from './components/OrderConfirmed'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='py-4'>
          <Container>
            <Route exact path='/order/:id'>
              <OrderScreen />
            </Route>
            <Route exact path='/order/:id/topay'>
              <OrderConfirmed />
            </Route>
            <Route exact path='/shipping'>
              <ShippingScreen />
            </Route>
            <Route exact path='/payment'>
              <PaymentScreen />
            </Route>
            <Route exact path='/placeorder'>
              <PlaceOrderScreen />
            </Route>
            <Route exact path='/login'>
              <LoginScreen />
            </Route>
            <Route exact path='/register'>
              <RegisterScreen />
            </Route>
            <Route exact path='/profile'>
              <ProfileScreen />
            </Route>
            <Route exact path='/product/:id'>
              <ProductScreen />
            </Route>
            <Route exact path='/cart/:id?'>
              <CartScreen />
            </Route>
            <Route exact path='/admin/userlist'>
              <UserListScreen />
            </Route>
            <Route exact path='/admin/user/:id/edit'>
              <UserEditScreen />
            </Route>
            <Route exact path='/admin/productlist'>
              <ProductListScreen />
            </Route>
            <Route exact path='/admin/productlist/:pageNumber'>
              <ProductListScreen />
            </Route>
            <Route exact path='/admin/product/:id/edit'>
              <ProductEditScreen />
            </Route>
            <Route exact path='/admin/orderlist'>
              <OrderListScreen />
            </Route>
            <Route exact path='/search/:keyword'>
              <HomeScreen />
            </Route>
            <Route exact path='/page/:pageNumber'>
              <HomeScreen />
            </Route>
            <Route exact path='/search/:keyword/page/:pageNumber'>
              <HomeScreen />
            </Route>
            <Route exact path='/'>
              <HomeScreen />
            </Route>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
