import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const SimilarCard = props => {
  const {cardData} = props

  return (
    <li className="similar-job-item">
      <div className="company-logo-title">
        <img
          src={cardData.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating">
          <h1 className="title">{cardData.title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{cardData.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="side-heading">Description</h1>
      <p className="description-life">{cardData.jobDescription}</p>
      <div className="location-container">
        <GoLocation className="icon" />
        <p className="location">{cardData.location}</p>
        <BsBriefcase className="icon" />
        <p className="location">{cardData.employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarCard
