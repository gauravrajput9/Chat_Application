import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900" style={{
      background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 100%)'
    }}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout
