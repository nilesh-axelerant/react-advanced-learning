import { useState } from 'react'
import './App.css'
import { ModalExample } from './ModalExample'
import { DatePicker } from './DatePicker'
import { GridInfiniteScroll } from './GridInfiniteScroll'

function App() {

  const [datevalue, setDatevalue] = useState(new Date())
  return (
    <>
      <ModalExample />

      <DatePicker value={new Date()} onChange={setDatevalue} />

      <GridInfiniteScroll />
    </>
  )
}

export default App
