import CartItem from '../CartItem'

import './index.css'
import CartContext from '../../context/CartContext/CartContext'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      return (
        <>
          <button
            className="btn btn-outline-danger align-self-end bg-sm"
            type="button"
            onClick={removeAllCartItems}
          >
            Remove All
          </button>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
