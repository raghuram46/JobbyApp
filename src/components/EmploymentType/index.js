import './index.css'

const EmploymentType = props => {
  const {employmentTypeData, changeEmploymentType} = props

  const onChangeEmploymentType = event => {
    changeEmploymentType(event.target.value)
  }

  return (
    <li className="item">
      <input
        type="checkbox"
        id={employmentTypeData.employmentTypeId}
        value={employmentTypeData.employmentTypeId}
        onChange={onChangeEmploymentType}
        className="checkbox"
      />
      <label
        htmlFor={employmentTypeData.employmentTypeId}
        className="checkbox-label"
      >
        {employmentTypeData.label}
      </label>
    </li>
  )
}

export default EmploymentType
