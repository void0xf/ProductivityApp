import React, { useContext, useState, createContext} from 'react'
import { TasksContext } from '../../contexts/tasks.context';
import { TaskFilter } from '../../contexts/filter.context';
import { CalendarDays, ChevronsRight, CircleDot, ListChecks, User, Briefcase, Menu, Search, StickyNote } from 'lucide-react';
import Sidebar from '../menu-bar/menu-bar.component';
import { SidebarItem } from '../menu-bar/menu-item/menu-item.component';
import { getTasksForToday } from '../../utils/task.utils';
import AddNewList from '../input/addNewList.component';
import { SidebarContext } from '../../App';
import SearchTask from './searchTask.component';

const componentMap = {
  'Personal': User,
  'Work': Briefcase
};

const MobileSidebar = ({IconSize}) => {
  const SIZE_OF_SIDEBAR_ICONS  = IconSize;
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const todayTasksCount = getTasksForToday(state.tasks, filterState.filterList).length;
  const { isSideBarActive, setIsSideBarActive } = useContext(SidebarContext);

  return (
    <div>
      <div className={`absolute z-50 transform transition-transform duration-700 h-screen ${!isSideBarActive ? '-translate-x-full absolute z-50' : ''}`}>
          <Sidebar>
            <SearchTask/>
            <div><p className='text-sm font-semibold ml-3'>Tasks</p></div>
              <SidebarItem 
                icon={<ChevronsRight size={SIZE_OF_SIDEBAR_ICONS} strokeWidth={3}/>} 
                text="Upcoming"
                alert
                numberOfAlerts={state.tasks.length}
                clickType={'Upcoming'}
                payload={'Upcoming'}
                />
              <SidebarItem 
                icon={<ListChecks size={SIZE_OF_SIDEBAR_ICONS} alert/>} 
                text="Today"
                alert
                clickType={'Today'}
                payload={'Today'}
                numberOfAlerts={todayTasksCount}
                />
              <SidebarItem 
                icon={<CalendarDays size={SIZE_OF_SIDEBAR_ICONS}/>} 
                text="Calendar" 
                alert
                clickType={'Calendar'}
                payload={'Calendar'}
                />
              <SidebarItem 
                icon={<StickyNote size={SIZE_OF_SIDEBAR_ICONS}/>} 
                text="Notes"
                clickType={'Notes'} 
                payload={'Notes'}
                />
            <div className='border-t-2 border-b-2 my-4 py-2 max-h-64 overflow-y-scroll'>
              <div><p className='text-sm font-semibold ml-3'>Lists</p></div>
              {state.lists.map((listItem) => {
                const IconComponent = componentMap[listItem.name];
                return (
                  <SidebarItem 
                    icon={IconComponent ? <IconComponent size={SIZE_OF_SIDEBAR_ICONS} /> : <CircleDot size={SIZE_OF_SIDEBAR_ICONS} />} 
                    text={listItem.name}
                    clickType={'list'}
                    payload={listItem.name}
                    active={filterState.listFilter == listItem.name ? 1 : 0}
                  /> 
                );
              }
              )}
              <AddNewList/>
            </div>
          </Sidebar> 
      </div>

      <div className={`sm:hidden
        ${!isSideBarActive 
        ? 
        'sticky z-40 transform transition-transform duration-700 translate-y-0 top-0' 
        : 
        '-translate-y-full transform transition-transform duration-700'} pl-2 pt-2 flex justify-between border-b-2 pb-3 bg-slate-100 absolute w-full`
        }>
        <button onClick={() => {setIsSideBarActive(true)}}><Menu/></button>
        <div className='sm:hidden'>
          {
            filterState.filter !== '' ?
            <>
            <span className='text-xl pr-5 font-semibold'>{filterState.filter}</span>
            <span className='p-1 px-2 text-base border-2 rounded-lg bg-gray-100'>
              {filterState.filter == 'Upcoming' ? state.tasks.length :
              filterState.filter == 'Today'    ? todayTasksCount    : 0 }
            </span>
            </>
            :
            null
          }

        </div>
      <div></div>
    </div>
    </div>
  )
}

export default MobileSidebar