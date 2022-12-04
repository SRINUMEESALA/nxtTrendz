import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import {loading} from '../PrimeProducts/index'
import './index.css'
import Filters from '../Filters'

class AllProducts extends Component {
  state = {
    productsLst: [],
    apiStatus: '',
    search: '',
    category: '',
    sortby: 'PRICE_HIGH',
    rating: '',
  }

  componentDidMount = () => {
    this.getProductsLst()
  }

  getProductsLst = async () => {
    const {rating, sortby, category} = this.state
    const token = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/products?sort_by=${sortby}&category=${category}&rating=${rating}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      let lst = data.products
      lst = lst.map(obj => ({
        brand: obj.brand,
        id: obj.id,
        price: obj.price,
        rating: obj.rating,
        title: obj.title,
        imageUrl: obj.image_url,
      }))
      this.setState({productsLst: lst, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  filterings = lst => {
    const [type, value] = lst
    switch (type) {
      case 'search':
        this.setState({search: value}, this.getProductsLst)

        break
      case 'category':
        this.setState({category: value}, this.getProductsLst)
        break
      case 'sortby':
        this.setState({sortby: value}, this.getProductsLst)
        break
      case 'rating':
        this.setState({rating: value}, this.getProductsLst)
        break
      default:
        this.setState(
          {rating: '', category: '', search: '', sortby: 'PRICE_HIGH'},
          this.getProductsLst,
        )
        break
    }
  }

  renderProducts = () => {
    const {productsLst, search} = this.state
    const filteredList = productsLst.filter(obj =>
      obj.title.toLowerCase().includes(search.toLowerCase()),
    )
    return (
      <div className="productsParentCon d-flex flex-column vh-100 overflow-auto mt-5">
        <div className="d-flex flex-column allProductsCon align-self-center">
          <div className="d-flex">
            <Filters filterings={this.filterings} />
            <div className="d-flex flex-column">
              <h1 className="productsHeading h4 ml-4">All Products</h1>
              <ul className="itemsCon list-unstyled d-flex flex-wrap align-self-start overflow-auto vh-100">
                {filteredList.map(obj => (
                  <ProductCard obj={obj} key={obj.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1 className=" ">Oops! Something went wrong!</h1>
      <small>Kindly! Try refreshing the page.</small>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderProducts()
      case 'failed':
        return this.failureView()
      default:
        return loading()
    }
  }
}

export default AllProducts
