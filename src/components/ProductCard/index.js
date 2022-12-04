/* eslint-disable react/button-has-type */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class ProductCard extends Component {
  render() {
    const {obj} = this.props
    const {title, imageUrl, brand, price, rating, id} = obj
    return (
      <li className="col-md-4 col-lg-3 col-12 d-flex justify-content-center mb-3 mt-2 p-md-3 liitem">
        <Link to={`/products/${id}`} className="linkComp">
          <div className="d-flex flex-column align-self-center shadow-sm w-100 justify-content-around h-100 col-12 p-2">
            <div className="text-center w-100">
              <img src={imageUrl} alt="" className="productImg rounded" />
            </div>
            <div className="d-flex justify-content-between p-2 w-100 detailsCon">
              <div className="d-flex flex-column justify-content-around titleCon">
                <p className="m-0 h6  title">{title}</p>
                <p className="m-0 small">{brand}</p>
              </div>
              <div className="d-flex flex-column justify-content-around align-items-end priceCon">
                <button className="m-0 btn btn-warning ratingButton">
                  {rating}
                  <i className="fa-regular fa-star ml-1"> </i>
                </button>
                <p className="m-0">
                  <span className="rupessSpan">Rs. </span>
                  <span className="font-weight-bold h6 price">{price}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default ProductCard
