import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext/CartContext'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const cartItemsCount = cartList.length
          let totalPrice = 0
          const calculatePrice = (val, qnt) => {
            totalPrice += val * qnt
          }
          cartList.map(obj => calculatePrice(obj.price, obj.quantity))
          return (
            <div className="d-flex flex-column p-3 cartStyle shadow">
              <div className="d-flex justify-content-between align-items-end">
                <h1 className="small">Cart Total:</h1>
                <span className="h4">
                  <span className="small">Rs </span>
                  {totalPrice}
                </span>
              </div>
              <p className="">
                <span className="text-primary font-weight-bold">
                  {' '}
                  {cartItemsCount}
                </span>{' '}
                item(s) in cart
              </p>
              <button type="button" className="btn btn-primary">
                Checkout
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
