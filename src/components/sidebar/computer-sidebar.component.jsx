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

const ComputerSidebar = () => {
  const SIZE_OF_SIDEBAR_ICONS  = 25;
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const todayTasksCount = getTasksForToday(state.tasks, filterState.filterList).length;
  const { isSideBarActive, setIsSideBarActive } = useContext(SidebarContext);

  return (
    
    <div className={`relative z-20 h-screen transition-all duration-700 ease-in-out overflow-hidden ${isSideBarActive ? 'max-w-xs' : 'max-w-0'}`}>
        <Sidebar>
         <SearchTask />
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
          <div className='border-t-2 border-b-2 my-4 py-2 max-h-64 overflow-y-auto'>
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
  )
}

export default ComputerSidebar
