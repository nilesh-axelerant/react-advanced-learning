import { useState } from 'react'
import './App.css'
import { ModalExample } from './ModalExample'
import { DatePicker } from './DatePicker'

function App() {

  const [datevalue, setDatevalue] = useState(new Date())
  return (
    <>
      <ModalExample />

      <DatePicker value={new Date()} onChange={setDatevalue} />
    </>
  )
}

export default App
