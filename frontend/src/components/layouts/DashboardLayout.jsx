import React, { useContext } from 'react'
import { UserContext } from "../../context/userContext"
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext )
  return (
    <div className="">
      <Navbar activeManu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeManu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout

