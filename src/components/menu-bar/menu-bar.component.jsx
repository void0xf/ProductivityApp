import React from 'react'
import Search from './search-bar/search.component'
import './menu-bar.css'
import TasksList from './task-lists/task-lists.compoent'
import Lists from './lists/lists.component'
import Tags from './tags/tags.component'


const MenuBar = () => {
  return (
    <div className='menu-bar'>
      <div className="menu">
        <h2>Menu</h2>
        <p>Icon</p>
      </div>
      <Search />
      <TasksList />
      <Lists />
      <Tags />
      <div>
        <div><p>Setting</p></div>
        <div><p>Sign out</p></div>
      </div>
    </div>
  )
}

export default MenuBar
