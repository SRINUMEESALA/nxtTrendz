import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    warnMsg: '',
    login: false,
    animation: false,
  }

  usernameEntering = event => {
    this.setState({username: event.target.value})
  }

  passwordEntering = event => {
    this.setState({password: event.target.value})
  }

  navigatePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  loginSucceeded = jwtToken => {
    Cookies.set('jwtToken', jwtToken, {expires: 0.00694})
    setTimeout(this.navigatePage, 3000)
  }

  formSubmitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      const obj = JSON.stringify({
        username,
        password,
      })
      const options = {
        method: 'POST',
        body: obj,
      }
      const response = await fetch('https://apis.ccbp.in/login', options)
      let data = await response.json()
      if (response.ok === true) {
        this.setState({login: true, warnMsg: 'Login Success'})
        this.loginSucceeded(data.jwt_token)
      } else {
        data = {
          statusCode: data.status_code,
          errorMsg: data.error_msg,
        }
        this.setState({warnMsg: data.errorMsg})
      }
    } else {
      this.setState({warnMsg: 'Fields should be empty!'})
    }
  }

  warningMsg = () => {
    const {warnMsg, login} = this.state
    const cls = login ? 'text-success' : 'text-danger'
    return <p className={cls}>{warnMsg}</p>
  }

  changeAnimation = () => {
    this.setState({animation: true})
  }

  render() {
    if (Cookies.get('jwtToken') !== undefined) {
      return <Redirect to="/" />
    }

    const {warnMsg, login, animation} = this.state
    const styleLogin = login ? 'border-success' : ''
    return (
      <div className="loginParentCon d-flex flex-md-row flex-column justify-content-center align-items-center min-vh-100">
        <div className="loginImgCon col-md-5 mt-3 d-flex flex-column">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png "
            alt="website login"
            className="loginImg"
          />
          {animation ? (
            <div className=" d-flex justify-content-center">
              <div className=" animatedDiv"> </div>
            </div>
          ) : (
            <div className=" d-flex justify-content-center">
              <button
                className="btn btn-warning mt-3 driveButton  d-flex justify-content-between p-2"
                type="button"
                onClick={this.changeAnimation}
              >
                <span className="text-white h5 m-0 pl-3 driveText">Drive</span>
                <span className="arrowCon d-flex align-items-center align-self-center">
                  <i className="fa-solid fa-arrow-right text-white pl-2 arrowIcon">
                    {' '}
                  </i>
                </span>
              </button>
            </div>
          )}
        </div>
        {animation && (
          <div className=" formCon col-md-5 d-flex justify-content-center align-items-center">
            <form
              className={`${styleLogin} form d-flex flex-column border  rounded shadow p-4 col-12 col-md-8`}
              onSubmit={this.formSubmitting}
            >
              <div className="logo text-center mb-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="formImg"
                />
              </div>
              <label htmlFor="username" className="m-0">
                USERNAME
              </label>
              <input
                type="text"
                className="mb-4 input border border-primary rounded p-1"
                id="username"
                placeholder="Username"
                onChange={this.usernameEntering}
              />
              <label htmlFor="password" className="m-0">
                PASSWORD
              </label>
              <input
                type="password"
                className="mb-4 input border border-primary rounded p-1"
                id="password"
                placeholder="Password"
                onChange={this.passwordEntering}
              />
              {login ? (
                <button className="btn btn-success" type="submit" disabled>
                  <span className="mr-2">Logging In...</span>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  >
                    {' '}
                  </span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              )}

              {warnMsg !== '' && this.warningMsg()}
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default LoginForm
