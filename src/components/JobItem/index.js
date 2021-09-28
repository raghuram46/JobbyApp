import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsBriefcase} from 'react-icons/bs'

import {withRouter} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobData} = props

  const onClickJobItem = () => {
    const {history} = props
    const {id} = jobData
    history.replace(`/jobs/${id}`)
  }

  return (
    <li className="job-item" onClick={onClickJobItem}>
      <div className="company-logo-title">
        <img
          src={jobData.companyLogoUrl}
          alt="company logo"
          className="company-logo"
        />
        <div className="title-rating">
          <h1 className="title">{jobData.title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{jobData.rating}</p>
          </div>
        </div>
      </div>
      <div className="location-package">
        <div className="location-container">
          <GoLocation className="icon" />
          <p className="location">{jobData.location}</p>
          <BsBriefcase className="icon" />
          <p className="location">{jobData.employmentType}</p>
        </div>
        <p className="package">{jobData.packagePerAnnum}</p>
      </div>
      <hr className="line" />
      <h1 className="side-heading">Description</h1>
      <p className="location">{jobData.jobDescription}</p>
    </li>
  )
}

export default withRouter(JobItem)
