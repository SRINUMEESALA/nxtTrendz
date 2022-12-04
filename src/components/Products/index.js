import {Component} from 'react'
import './index.css'
import AllProducts from '../AllProducts'
import PrimeProducts from '../PrimeProducts'
import Header from '../Header'

class Products extends Component {
  render() {
    return (
      <>
        <Header />
        <PrimeProducts />
        <AllProducts />
      </>
    )
  }
}

export default Products
