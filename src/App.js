import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    let {cartList} = this.state
    cartList = cartList.map(obj => {
      if (obj.id === id) {
        return {...obj, quantity: obj.quantity + 1}
      }
      return obj
    })
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    let {cartList} = this.state
    cartList = cartList.map(obj => {
      if (obj.id === id) {
        if (obj.quantity === 1) {
          return {}
        }
        return {...obj, quantity: obj.quantity - 1}
      }
      return obj
    })
    cartList = cartList.filter(obj => obj.id !== undefined)
    this.setState({cartList})
  }

  checkExistance = (product, cartList) => {
    const cond = cartList.filter(obj => product.id === obj.id)
    if (cond.length > 0) {
      return true
    }
    return false
  }

  addCartItem = product => {
    let {cartList} = this.state
    if (this.checkExistance(product, cartList)) {
      cartList = cartList.map(obj => {
        if (obj.id === product.id) {
          return {...obj, quantity: obj.quantity + 1}
        }
        return obj
      })
      this.setState({cartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    let {cartList} = this.state
    cartList = cartList.filter(obj => obj.id !== id)
    this.setState({cartList})
  }

  render() {
    const {cartList} = this.state
    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/products" component={Products} />
              <ProtectedRoute
                exact
                path="/products/:id"
                component={ProductItemDetails}
              />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </CartContext.Provider>
      </>
    )
  }
}

export default App
