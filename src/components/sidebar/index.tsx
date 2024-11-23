import React from 'react'
import './sidebar.css'
import SidebarButton from '../sidebarButton'
import { MdFavorite } from 'react-icons/md'
import { FaGripfire, FaPlay } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaS } from 'react-icons/fa6'

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s'
        className='profile-img' 
        alt='profile pic'
      />
      <div>
        <SidebarButton title="Feed" to="/home" icon={<MdSpaceDashboard/>}/>
        <SidebarButton title="Search" to="/for-you" icon={<FaGripfire/>}/>
        <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite/>}/>
      </div>
      <SidebarButton title="Sign Out" to="/" icon={<FaSignOutAlt/>}/>
    </div>

  )
}
