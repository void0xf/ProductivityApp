import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const SidebarArrow = ({isSideBarActive, setIsSideBarActive}) => {
  return (
    <div className='my-auto'>
    <button onClick={() => {setIsSideBarActive(!isSideBarActive)}}>
      <div className={`transition-transform transform  ${
        isSideBarActive ? 'rotate-180 duration-400' : 'rotate-0'
      }`}>
      {
        isSideBarActive 
        ?
        <div className='relative rotate-180'>
          <ChevronLeft color='gray'/>
        </div>
        :
        <ChevronRight color='gray'/>
      }
      </div>
      </button>
  </div>
  )
}

export default SidebarArrow
