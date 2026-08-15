import React from 'react'
import DataDashboard from './components/DataDashboard'
import './App.css'

/**
 * App Component
 * Main entry point of the React application.
 * Renders the DataDashboard component which handles all the API logic.
 */
function App() {
  return (
    <div className="app">
      <DataDashboard />
    </div>
  )
}

export default App