/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import CartContext from '../../context/CartContext/CartContext'

class ProductItemDetails extends Component {
  state = {
    productDet: '',
    apiStatus: 'initial',
    count: 1,
    currentIdOfSimiliarPro: 0,
  }

  componentDidMount() {
    this.fetchProductDetails()
  }

  fetchProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    let Id
    const {currentIdOfSimiliarPro} = this.state
    if (currentIdOfSimiliarPro !== 0) {
      Id = currentIdOfSimiliarPro
    } else {
      Id = id
    }
    const token = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/products/${Id}`, options)
    if (response.ok) {
      let data = await response.json()
      data = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        total_reviews: data.total_reviews,
      }
      const simProducts = data.similarProducts.map(obj => ({
        title: obj.title,
        brand: obj.brand,
        price: obj.price,
        id: obj.id,
        imageUrl: obj.image_url,
        rating: obj.rating,
      }))
      data = {...data, similarProducts: simProducts}
      this.setState({productDet: data, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  changeQuantity = who => {
    const {count} = this.state
    switch (who) {
      case 'plus':
        this.setState({count: count + 1})
        break

      default:
        if (count > 1) {
          this.setState({count: count - 1})
        }

        break
    }
  }

  renderFailureView = () => (
    <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <div className="text-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="products failure"
            className="sizeFailure"
          />
        </div>
        <h1 className="text-center">Product Not Found</h1>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.moveToProducts}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )

  loadItemInSamePage = itemId => {
    this.setState({currentIdOfSimiliarPro: itemId}, this.fetchProductDetails)
  }

  renderSuccessView = () => {
    const {productDet, count} = this.state

    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productDet
    let {similarProducts} = productDet
    // console.log(similarProducts)
    if (similarProducts === undefined) {
      similarProducts = [{}]
    }
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          return (
            <div className="d-flex flex-row justify-content-center p-2 mt-4">
              <div className="itemParentCon">
                <div className=" d-flex ">
                  <div className="itemImg col-6 text-center">
                    <img src={imageUrl} alt="product" className="imagepord" />
                  </div>
                  <div className="d-flex flex-column p-2 justify-content-around">
                    <h1 className="h3">{title}</h1>
                    <p className="h5">Rs.{price}</p>
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-warning d-flex p-1"
                      >
                        <p className="align-self-center pr-1 m-0">{rating}</p>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                          alt="star"
                          className="starimg"
                        />
                      </button>
                      <p>{totalReviews}</p>
                    </div>
                    <p className="m-1">{description}</p>
                    <p>
                      <span className="font-weight-bold">Brand: </span>
                      {brand}
                    </p>
                    <p>
                      <span className="font-weight-bold">Availability: </span>
                      {availability}
                    </p>

                    <div className="d-flex">
                      <button
                        type="button"
                        className="buttonPlus"
                        testid="plus"
                        onClick={() => {
                          this.changeQuantity('plus')
                        }}
                      >
                        <BsPlusSquare />
                      </button>
                      <p className="align-self-center p-1 m-0 font-weight-bold h6">
                        {count}
                      </p>
                      <button
                        type="button"
                        className="buttonPlus"
                        testid="minus"
                        onClick={() => {
                          this.changeQuantity('minus')
                        }}
                      >
                        <BsDashSquare />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary align-self-start"
                      onClick={() =>
                        addCartItem({...productDet, quantity: count})
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <ul className="d-flex flex-wrap mt-4">
                  {similarProducts.map(obj => (
                    <SimilarProductItem
                      obj={obj}
                      key={obj.id}
                      loadItemInSamePage={this.loadItemInSamePage}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div
      className="text-center loader d-flex justify-content-center align-items-center"
      testid="loader"
    >
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderUi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()

      default:
        return this.renderLoadingView()
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="productDetailsParentCon d-flex flex-column">
        <Header />
        {this.renderUi()}
      </div>
    )
  }
}

export default ProductItemDetails
