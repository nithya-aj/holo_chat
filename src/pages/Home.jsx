import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import '../style.scss'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home