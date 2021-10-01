import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsList from '../JobsList'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: '',
    employmentTypeList: [],
    employmentType: '',
    minimumPackage: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  addToEmploymentTypeList = () => {
    const {employmentType, employmentTypeList} = this.state

    if (employmentTypeList.some(each => each === employmentType)) {
      const filteredData = employmentTypeList.filter(
        each => each !== employmentType,
      )

      this.setState({employmentTypeList: filteredData})
    } else {
      this.setState(prevState => ({
        employmentTypeList: [...prevState.employmentTypeList, employmentType],
      }))
    }
  }

  changeEmploymentType = value => {
    this.setState({employmentType: value}, this.addToEmploymentTypeList)
  }

  changeMinimumPackage = value => {
    this.setState({minimumPackage: value})
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state

    return (
      <div className="profile-container">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="loader-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.getProfileDetails}
      >
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
        return this.renderProfileView()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return ''
    }
  }

  render() {
    const {employmentTypeList, minimumPackage} = this.state
    const employmentTypeString = employmentTypeList.join(',')

    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="side-bar">
            {this.checkApiStatus()}
            <hr className="line" />
            <h1 className="side-heading">Type of Employment</h1>
            <ul className="employment">
              {employmentTypesList.map(each => (
                <EmploymentType
                  key={each.employmentTypeId}
                  employmentTypeData={each}
                  changeEmploymentType={this.changeEmploymentType}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="side-heading">Salary Range</h1>
            <ul className="employment">
              {salaryRangesList.map(each => (
                <SalaryRange
                  key={each.salaryRangeId}
                  range={each}
                  changeMinimumPackage={this.changeMinimumPackage}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-search-container">
            <JobsList
              employmentTypeString={employmentTypeString}
              minimumPackage={minimumPackage}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
