import { Routes, Route } from 'react-router-dom'
import Shell from './components/Shell.jsx'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Shell />} />
    </Routes>
  )
}

export default App