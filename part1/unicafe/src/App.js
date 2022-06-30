import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Feedback = ({ goodClick, neutralClick, badClick }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={goodClick} text="good" />
        <Button handleClick={neutralClick} text="neutral" />
        <Button handleClick={badClick} text="bad" />
      </div>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good+bad+neutral
  if (all > 0){
    return (
      <div>
        <h1>
          statistics
        </h1>
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(good - bad)/all} />
          <StatisticLine text="positive" value={(good * 100)/all} />
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <div>
          <h1>statistics</h1>
        </div>
        <div>No feedback given</div>
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good+1)
  }

  const neutralClick = () => {
    setNeutral(neutral+1)
  }

  const badClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <div>
        <Feedback goodClick={goodClick} neutralClick={neutralClick} badClick={badClick} />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App