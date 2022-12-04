import Header from '../Header'
import CartListView from '../CartListView'

import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container d-flex flex-between flex-column">
                <>
                  <h1 className="cart-heading mt-3">My Cart</h1>
                  <CartListView />
                </>
                <div className="align-self-end">
                  <CartSummary />
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
