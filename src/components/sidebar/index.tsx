import React from 'react'
import './sidebar.css'
import SidebarButton from '../sidebarButton'
import { MdFavorite } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import logo from '../../../public/tunequestlogo.png';

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img 
        src={logo.src} 
        alt="TuneQuest Logo" 
        className='profile-img' 
      />
      <div>
        <SidebarButton title="Feed" to="/home" icon={<MdSpaceDashboard/>}/>
        <SidebarButton title="Search" to="/for-you" icon={<FaSearch/>}/>
      </div>
      <SidebarButton title="Sign Out" to="/" icon={<FaSignOutAlt/>}/>
    </div>

  )
}
