'use client';

import React from 'react'
import './sidebarButton.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarButtonProps {
    to: string;
    icon: React.ReactNode; // Define que el icono puede ser un nodo React
    title: string;
  }

export default function SidebarButton(props: SidebarButtonProps) {
    const pathname = usePathname();
    const isActive= pathname === props.to;
    const btnClass = isActive ? 'btn-body active' : 'btn-body';

    return (
    <Link href={props.to}>
        <div className={btnClass}>   
            <div className="btn-icon" style={{ fontSize: '24px' }}>
            {props.icon}
            </div>
            <p className='btn-title'>{props.title}</p>
        </div>
    </Link>
    
  )
}

/*export default function SidebarButton(props: SidebarButtonProps) {
    return (
      <Link href={props.to}>
          <div className='btn-body'>
              <IconContext.Provider value={{size: '24px', className: 'btn-icon'}}>
                  {props.icon}
                  <p className='btn-title'>{props.title}</p>
              </IconContext.Provider>
          </div>
      </Link>
      
    )
  }*/