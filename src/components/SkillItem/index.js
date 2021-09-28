import './index.css'

const SkillItem = props => {
  const {skillData} = props

  return (
    <li className="skill-item">
      <img
        src={skillData.imageUrl}
        alt={skillData.name}
        className="skill-image"
      />
      <p className="skill-name">{skillData.name}</p>
    </li>
  )
}

export default SkillItem
