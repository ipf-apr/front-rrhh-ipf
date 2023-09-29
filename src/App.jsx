import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Index from './components/Index'

function App() {

  return (
    <>
      {/* NavBar */}
      <NavBar />

      <Index />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
