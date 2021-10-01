import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsList extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypeString, minimumPackage} = this.props
    const {searchInput} = this.state

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    return jobsList.length === 0 ? (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="error-image"
        />
        <h1 className="text">No Jobs Found</h1>
        <p className="message">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobData={eachJob} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="text">Oops! Something Went Wrong</h1>
      <p className="message">
        We cannot seem to find the package you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return ''
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <div className="search-container">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            className="search-input"
          />
          <button
            type="button"
            testid="searchButton"
            className="search-btn"
            onClick={this.onClickSearchBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.checkApiStatus()}
      </>
    )
  }
}

export default JobsList
