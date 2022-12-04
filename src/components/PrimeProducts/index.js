import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import '../AllProducts/index.css'
import './index.css'
import ProductCard from '../ProductCard'

export const loading = () => (
  <div className="text-center">
    <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
  </div>
)

class PrimeProducts extends Component {
  state = {primeDealsList: [], apiStatus: 'pending'}

  componentDidMount = () => {
    this.getPrimeProducts()
  }

  getPrimeProducts = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`,
      },
    }

    const response = await fetch('https://apis.ccbp.in/prime-deals', options)
    if (response.ok === true) {
      const body = await response.json()
      const deals = body.prime_deals.map(obj => ({
        availability: obj.availability,
        brand: obj.brand,
        description: obj.description,
        id: obj.id,
        imageUrl: obj.image_url,
        price: obj.price,
        rating: obj.rating,
        style: obj.style,
        title: obj.title,
        totalReviews: obj.total_reviews,
      }))
      this.setState({primeDealsList: deals, apiStatus: 'success'})
      console.log(deals)
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  notPrimeUser = () => (
    <div className="mt-3 text-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="register-prime-image"
      />
    </div>
  )

  primeUserDeals = () => {
    const {primeDealsList} = this.state
    return (
      <div className="productsParentCon d-flex flex-column">
        <div className="d-flex flex-column allProductsCon align-self-center mt-5">
          <h1 className="productsHeading h4 ">Exclusive Prime Deals</h1>
          <ul className="itemsCon list-unstyled d-flex flex-wrap align-self-center">
            {primeDealsList.map(obj => (
              <ProductCard obj={obj} key={obj.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'success':
        return this.primeUserDeals()

      case 'failed':
        return this.notPrimeUser()

      default:
        return loading
    }
  }
}

export default PrimeProducts
