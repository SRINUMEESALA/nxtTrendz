import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="homeParentCon d-flex flex-column min-vh-100">
        <Header />
        <div className="introCon d-flex justify-content-center pt-4">
          <div className="introChildCon d-flex flex-md-row flex-column">
            <div className="con1 align-self-center p-3 order-md-1 order-2">
              <h1 className="mb-4">Clothes That Get YOU Noticed</h1>
              <p className="mb-4 text-center">
                Fashion is part of the daily air Krishna Das is an American
                vocalist known for his performances of Hindu devotional music
                known as kirtan. He has released seventeen albums since 1996. He
                performed at the 2013 Grammy Awards, where his album Live Ananda
                was nominated for the 2013 Grammy Award for Best New Age Album.
              </p>
              <div className="text-center text-md-start">
                <button className="btn btn-primary" type="button">
                  <Link to="/products/" className="linkComponent text-white">
                    Shop Now
                  </Link>
                </button>
              </div>
            </div>
            <div className="con2 order-md-2 order-1 text-center col-md-6">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="clothes that get you noticed"
                className="homeImg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
