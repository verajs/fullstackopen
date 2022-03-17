import { useState } from 'react'

const Display = (props) => {
  return (
    <div>
      has {props.votes} votes
    </div>
  )
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <div>
    <button onClick={handleClick}>
    {text}
    </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const setAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const setScore = () => {
    const copy = {...votes}
    copy[selected] +=1
    setVotes(copy)
  }

  const maxIndex = () => {
    var max = votes[0]
    var maxIndex = 0
    for (var i = 1; i < 7; i++)
    {
      if (votes[i] > max) {
        maxIndex = i;
        max = votes[i]
      }
    }
    return maxIndex
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <Display votes={votes[selected]} />
      <Button text='next anecdote' handleClick={setAnecdote}/>
      <Button text='vote' handleClick={setScore}/>
      <Header text="Anecdote with most votes" />
      {anecdotes[maxIndex()]}
      <Display votes={votes[maxIndex()]} />
    </div>
  )
}

export default App