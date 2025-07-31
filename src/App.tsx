import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="main-content">
        <Header />
        <main className="content">
          <Dashboard activeSection={activeSection} />
        </main>
      </div>
    </div>
  )
}

export default App
