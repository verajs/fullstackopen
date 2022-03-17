import { useState } from 'react'

const Statistic = ({text, value}) => {
  if (text === "positive") {
    return(
      <tr>
      <td>{text}</td> 
      <td>{value} %</td>
      </tr>
    )
  }
  else{
    return(
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0)
  {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
  return(
  <table>
  <tbody>
  <Statistic text="good" value={good} />
  <Statistic text="neutral" value={neutral} />
  <Statistic text="bad" value={bad} />
  <Statistic text="all" value={all} />
  <Statistic text="average" value={(good * 1 + bad * -1) / (all)} />
  <Statistic text="positive" value={good * (100 / all)} />
  </tbody>
  </table>
  )
  }
}


const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    setGood(good + 1)
  }

  const setToNeutral = newValue => {
    setNeutral(neutral + 1)
  }

  const setToBad = newValue => {
    setBad(bad + 1)
  }

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }
  
  return (
    <div>
    <Header title='give feedback' />
    <Button handleClick={() => setToGood()} text="good" />
    <Button handleClick={() => setToNeutral()} text="neutral" />
    <Button handleClick={() => setToBad()} text="bad" />
    <Header title='statistics' />
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App