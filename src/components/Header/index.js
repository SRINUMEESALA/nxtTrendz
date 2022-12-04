import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'
import CartContext from '../../context/CartContext/CartContext'

class Header extends Component {
  logOut = () => {
    Cookies.remove('jwtToken')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartLength = cartList.length
          return (
            <div className="headerParentCon d-flex justify-content-center">
              <div className="navBar d-flex justify-content-between pt-3">
                <div className="logoNav">
                  <Link to="/">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                      alt="website logo"
                      className="logoInNav"
                    />
                  </Link>
                </div>
                <ul className="list-unstyled navItems d-flex align-items-center justify-content-between font-weight-bold">
                  <li className="m-0">
                    <Link className="linkRoute" to="/">
                      <span className="home">Home</span>
                      <i className="fa-solid fa-house-user iconF mr-1"> </i>
                    </Link>
                  </li>
                  <li className="m-0">
                    <Link className="linkRoute" to="/products">
                      <span className="Products">Products</span>
                      <i className="fa-solid fa-shop iconF mr-1"> </i>
                    </Link>
                  </li>
                  <li className="m-0 d-flex">
                    <Link className="linkRoute" to="/cart">
                      <span className="Cart">Cart</span>
                      <i className="fa-solid fa-cart-shopping iconF mr-1"> </i>
                    </Link>
                    <span className="badge badge-white shadow-sm align-self-center ml-2">
                      <span className="text-dark">{cartLength}</span>
                    </span>
                  </li>
                  <button
                    type="button"
                    className="btn btn-primary d-none d-md-block p-0 p-1"
                    onClick={this.logOut}
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    className="btn d-md-none"
                    onClick={this.logOut}
                  >
                    <i className="fa-solid fa-right-from-bracket iconF"> </i>
                  </button>
                </ul>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)
