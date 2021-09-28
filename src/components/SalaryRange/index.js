import './index.css'

const SalaryRange = props => {
  const {range, changeMinimumPackage} = props

  const onChangeMinimumPackage = event => {
    changeMinimumPackage(event.target.value)
  }

  return (
    <li className="item">
      <input
        type="radio"
        id={range.salaryRangeId}
        value={range.salaryRangeId}
        onChange={onChangeMinimumPackage}
        className="checkbox-salary"
      />
      <label htmlFor={range.salaryRangeId} className="checkbox-label">
        {range.label}
      </label>
    </li>
  )
}

export default SalaryRange
