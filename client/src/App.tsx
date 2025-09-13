import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CreateMindMap } from './pages/CreateMindMap'
import { Collaboration } from './pages/Collaboration'
import { PricingPage } from './pages/PricingPage'
import './index.css'

function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateMindMap />} />
          <Route path="/collaborate/:id" element={<Collaboration />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
