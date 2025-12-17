import React from 'react'
import CustomerNavBar from '../CustomerNavBar/CustomerNavBar'
import { Outlet } from 'react-router-dom'

const CustomerLayOut = () => {
  return (
    <div>
        <CustomerNavBar/>
        <Outlet/>
    </div>
  )
}

export default CustomerLayOut