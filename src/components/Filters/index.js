import {BsArrowBarLeft, BsArrowBarRight} from 'react-icons/bs'
import {Component} from 'react'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class Filters extends Component {
  state = {
    search: '',
    selCatId: '',
    selSortOpt: 'PRICE_HIGH',
    selRatId: 1,
    showFilters: true,
  }

  filteringsSend = lst => {
    const {filterings} = this.props
    filterings(lst)
    const [type, value] = lst
    switch (type) {
      case 'search':
        this.setState({search: value})

        break
      case 'category':
        this.setState({selCatId: value})
        break
      case 'sortby':
        this.setState({selSortOpt: value})
        break
      case 'rating':
        this.setState({selRatId: value})
        break
      default:
        this.setState({
          selRatId: '',
          selCatId: '',
          search: '',
          selSortOpt: 'PRICE_HIGH',
        })
        break
    }
  }

  renderSearch = () => {
    const {search} = this.state
    return (
      <div className="">
        <h1 className="h5">Search</h1>
        <input
          type="search"
          onChange={event =>
            this.filteringsSend(['search', event.target.value])
          }
          className="form-control pl-3"
          placeholder="'Fashion'"
          value={search}
        />
      </div>
    )
  }

  renderSortby = () => {
    const {selSortOpt} = this.state
    return (
      <div className="mt-3">
        <h1 className="h5">Sort by</h1>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={event => {
            this.filteringsSend(['sortby', event.target.value])
          }}
        >
          {sortbyOptions.map(obj => {
            let isSelected = false
            if (selSortOpt === obj.optionId) {
              isSelected = true
            }
            return (
              <option
                className=""
                key={obj.optionId}
                value={obj.optionId}
                selected={isSelected}
              >
                {obj.displayText}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  renderCategory = () => {
    const {selCatId} = this.state
    return (
      <div className="mt-3">
        <h1 className="h5">Category</h1>
        {categoryOptions.map(obj => {
          let styleCat = ''
          if (obj.categoryId === selCatId) {
            styleCat = 'm-0 sortOptions pl-2 rounded text-warning'
          } else {
            styleCat = 'm-0 sortOptions pl-2 rounded'
          }
          return (
            <p
              className={styleCat}
              key={obj.categoryId}
              onClick={() => this.filteringsSend(['category', obj.categoryId])}
            >
              {obj.name}
            </p>
          )
        })}
      </div>
    )
  }

  renderRating = () => {
    const {selRatId} = this.state
    return (
      <div className="mt-3">
        <h1 className="h5 mb-3">Rating</h1>
        {ratingsList.map(obj => {
          let isRatingSelected = false
          if (obj.ratingId === selRatId) {
            isRatingSelected = true
          }
          return (
            <div className="d-flex justify-content-around mt-2">
              <img
                src={obj.imageUrl}
                alt=""
                className="starsRating rating"
                onClick={() => this.filteringsSend(['rating', obj.ratingId])}
              />
              <p className="m-0 mb-2">&up</p>
              {isRatingSelected && (
                <p className="text-primary font-weight-bold h5">|</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  clearFilters = () => (
    <div className="text-right mt-2">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => {
          this.filteringsSend(['clear', 'all'])
        }}
      >
        Clear
      </button>
    </div>
  )

  hideShowFilters = () => {
    this.setState(prevState => ({showFilters: !prevState.showFilters}))
  }

  renderFiltersHead = () => (
    <div className="d-flex justify-content-between  mt-5">
      <h1 className="h4 text-center">Filters</h1>
      <BsArrowBarLeft
        className=" align-self-start  mt-1 openClose"
        onClick={this.hideShowFilters}
      />
    </div>
  )

  render() {
    const {showFilters} = this.state
    const size = showFilters ? 'col-2 filterSection' : 'h3'
    return (
      <div className={`${size} `} id="filterParentSuper">
        {showFilters ? (
          <>
            {this.renderFiltersHead()}
            {this.renderSearch()}
            {this.renderSortby()}
            {this.renderCategory()}
            {this.renderRating()}
            {this.clearFilters()}
          </>
        ) : (
          <BsArrowBarRight
            className=" align-self-start  mt-5 openClose"
            onClick={this.hideShowFilters}
          />
        )}
      </div>
    )
  }
}

export default Filters
