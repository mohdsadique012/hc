import React from 'react'
import Header from './Component/Footer/Header'
import Footer from './Component/Footer/Footer'
import { Outlet } from "react-router-dom";
function Layout({children}) {
  return (
    <>
<Header />
<Outlet />
<Footer />
</>
  )
}

export default Layout
