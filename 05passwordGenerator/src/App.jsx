import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "~`!@#$%^&*{}?+-[]"
    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword ])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="b g-gray-700 w-full max-w-md mx-auto my-12 rounded-lg shadow-lg px-4 py-6 text-orange-500">
        <h1 className="text-white text-center text-2xl p-4 font-bold">Password Generator</h1>
        <div className="flex">
          <input
          type="text"
          value={password}
          readOnly
          placeholder='Password'
          ref={passwordRef}
          className='outline-none w-full py-1 px-3' />
          <button onClick={copyPasswordToClipboard} className='bg-blue-600 shrink-0 outline-none px-2 text-white py-0.5'>copy</button>
        </div>
        <div className='flex gap-4 text-sm gap-x-2 py-5'>
          <div className='flex gap-x-1 items-center'>
            <input
              type="range"
              name='length'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)  => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }} />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
