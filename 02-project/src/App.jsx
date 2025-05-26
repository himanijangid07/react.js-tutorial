import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)

  // let counter = 5

  const addValue = () => {
    console.log('clicked', counter)
    // counter = counter + 1
    if(counter < 20) {
      setCounter(counter + 1)
    }
    else {
      alert('cannot increase the counter value above 20')
    }
  }

  const removeValue = () => {
    if(counter > 0) {
      setCounter(counter - 1)
    } else {
      alert(`can't decrease the counter less than 0`)
    }
  }

  return (
    <>
      <h1>Himani Jangid</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addValue}>Add Value {counter}</button>
      <br />
      <button onClick={removeValue}>Remove Value{counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App