import {Component} from 'react'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsBriefcase} from 'react-icons/bs'

import {RiExternalLinkFill} from 'react-icons/ri'

import Loader from 'react-loader-spinner'

import {v4 as uuidv4} from 'uuid'

import SkillItem from '../SkillItem'
import SimilarCard from '../SimilarCard'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: '',
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetailsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        title: data.job_details.title,
      }

      const UpdatedSimilarJobsData = data.similar_jobs.map(each => ({
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
        jobDetails: updatedData,
        similarJobsList: UpdatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobDetails, similarJobsList} = this.state
    const {skills, lifeAtCompany} = jobDetails
    const updatedSkills = skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
      id: uuidv4(),
    }))

    const updatedLifeAtCompany = {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }

    return (
      <>
        <Header />
        <div className="job-details-page">
          <div className="job-item">
            <div className="company-logo-title">
              <img
                src={jobDetails.companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating">
                <h1 className="title">{jobDetails.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package">
              <div className="location-container">
                <GoLocation className="icon" />
                <p className="location">{jobDetails.location}</p>
                <BsBriefcase className="icon" />
                <p className="location">{jobDetails.employmentType}</p>
              </div>
              <p className="package">{jobDetails.packagePerAnnum}</p>
            </div>
            <hr className="line" />
            <div className="description-link">
              <h1 className="side-heading">Description</h1>
              <div classNome="anchor-icon">
                <a href={jobDetails.companyWebsiteUrl} className="anchor">
                  Visit
                </a>
                <RiExternalLinkFill className="anchor" />
              </div>
            </div>
            <p className="location">{jobDetails.jobDescription}</p>
            <h1 className="side-heading">Skills</h1>
            <ul className="skills-container">
              {updatedSkills.map(each => (
                <SkillItem key={each.id} skillData={each} />
              ))}
            </ul>
            <h1 className="side-heading">Life at Company</h1>
            <div className="description-image">
              <p className="description-life">
                {updatedLifeAtCompany.description}
              </p>
              <img
                src={updatedLifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobsList.map(each => (
              <SimilarCard key={each.id} cardData={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
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
        <button type="button" className="retry-btn" onClick={this.getJobData}>
          Retry
        </button>
      </div>
    </>
  )

  renderLoaderView = () => (
    <>
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return ''
    }
  }
}

export default JobItemDetails
