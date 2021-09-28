import {Link, withRouter} from 'react-router-dom'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <navbar className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="nav-links">
        <li className="nav-link">
          <Link to="/">
            <button type="button" className="button">
              Home
            </button>
            <button type="button" className="mobile-button">
              <AiFillHome className="icon" />
            </button>
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/jobs">
            <button type="button" className="button">
              Jobs
            </button>
            <button type="button" className="mobile-button">
              <BsBriefcaseFill className="icon" />
            </button>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="mobile-logout"
            onClick={onClickLogout}
          >
            <FiLogOut className="icon" />
          </button>
        </li>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </navbar>
  )
}

export default withRouter(Header)
