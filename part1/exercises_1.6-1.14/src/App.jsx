import { useState, useEffect } from 'react';

const Statistics = ({ good, neutral, bad}) => {

  const total = good + neutral + bad;

  const averageScore = (good * 1 + neutral * 0 + bad * -1) / total;

  const positiveFeedbackPercentage = (good / total) * 100;

  return (
    <div>
      <h2>Feedback Statistics</h2>
      <table>
      <tbody>
          <tr>
            <th>Good</th>
            <td>{good}</td>
          </tr>
          <tr>
            <th>Neutral</th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th>Bad</th>
            <td>{bad}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{total}</td>
          </tr>
          <tr>
            <th>Average</th>
            <td>{averageScore}</td>
          </tr>
          <tr>
            <th>Positive</th>
            <td>{positiveFeedbackPercentage}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [selected, setSelected] = useState(0)
  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)
  const [mostVoted, setMostVoted] = useState("")

  const handleFeedback = (feedbackType) => {
    switch (feedbackType) {

      case 'good':
        setGood(good + 1)
        setShowContent(true)
        break

      case 'neutral':
        setNeutral(neutral + 1)
        setShowContent(true)
        break

      case 'bad':
        setBad(bad + 1)
        setShowContent(true)
        break

      case 'all':
        setBad(bad + 1)
        break

        case 'average':
          setBad(bad + 1)
          break

      default:
        break
    }
  }

  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  useEffect(() => {
    // Calculate the most voted anecdote and its vote count
    const max = Math.max(...votes)
    setMaxVotes(max)
    const index = votes.indexOf(max)
    setMostVoted(anecdotes[index])
  }, [votes, anecdotes])

  return (
    <div>
      <h1>Give Feedback</h1> 
      <Button text='Good' onClick={() => handleFeedback('good')} />
      <Button text='Neutral' onClick={() => handleFeedback('neutral')} />
      <Button text='Bad' onClick={() => handleFeedback('bad')} />
      

      {showContent ? (
        <div>
          <Statistics good={good} neutral={neutral} bad={bad} />
          <br />
          <Button text="Next anecdote" onClick={() => handleRandomAnecdote()} />
          <Button text="Vote" onClick={() => voteAnecdote()} />
          <br />
          <br />
          {anecdotes[selected]}
          <p>Votes for this anecdote: {votes[selected]}</p>
          <h1>Most Voted Anecdotes</h1>
          <p>{mostVoted}</p>
          <p>with {maxVotes} votes</p>
        </div>
        
      ) : (
        <p>No feedback given.</p>
      )}
    </div>
  )
}

export default App
