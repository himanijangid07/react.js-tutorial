import { useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState('olive')

  return (
    <>
      <div className='w-full h-screen duration-200'
      style={{backgroundColor: color}}>
        <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 '>
          <div className='flex flex-wrap justify-center bg-white px-2 py-3 shadow-lg gap-5 rounded-lg'>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('red')}} style={{backgroundColor: "red"}}>Red</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('green')}} style={{backgroundColor: "green"}}>Green</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('blue')}} style={{backgroundColor: "blue"}}>Blue</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('yellow')}} style={{backgroundColor: "yellow"}}>Yellow</button>
            <button className='px-4 py-1 rounded-lg text-white' onClick={() => {setColor('black')}} style={{backgroundColor: "black"}}>Black</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('purple')}} style={{backgroundColor: "purple"}}>Purple</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('orange')}} style={{backgroundColor: "orange"}}>Orange</button>
            <button className='px-4 py-1 rounded-lg' onClick={() => {setColor('aqua')}} style={{backgroundColor: "aqua"}}>Aqua</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
