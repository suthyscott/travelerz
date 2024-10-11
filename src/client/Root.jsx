import React from 'react'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Root