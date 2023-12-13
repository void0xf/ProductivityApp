import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TasksContext, useTaskContext } from './contexts/tasks.context';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-bar/menu-item/menu-item.component';
import { ChevronsRight, ListChecks, CalendarDays, StickyNote, User, Briefcase, Menu, CircleDot, Search } from 'lucide-react';
import { GetTodayTasks } from './contexts/tasks.context';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { TaskFilter, filtrTasks } from './contexts/filter.context'
import StickWall from './components/sticky-wall/stick-wall.component'
import StickWallProvider from './contexts/sticky-wall.context';
import Calendar from './components/calendar/calendar.component';
import Upcoming from './components/upcomingTasks/upcoming.component';
import TodayTasks from './components/todayTasks/today-Tasks.component';
import { getTasksForToday } from './utils/task.utils';
import AddNewList from './components/input/addNewList.component';
import { Notes } from '@mui/icons-material';

const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

export const SidebarContext = createContext();

function App() {
  const SIZE_OF_SIDEBAR_ICONS = 19

  const { state, dispatch } = useContext(TasksContext);
  const { state:filterState } = useContext(TaskFilter);
  const [ todayTasksCount, setTodayTasksCount] = useState(0);
  const [ isStickWallActive, setIsStickWallActive ] = useState(true);
  const [ isSideBarActive, setIsSideBarActive] = useState(true);

  useEffect(() => {
    setTodayTasksCount(0);
    const tasksForToday = getTasksForToday(state.tasks);
    setTodayTasksCount(tasksForToday.length);
  }, [state.tasks]);

  useEffect(() => {
    console.log(state, 'Filter: ', filterState)
  }, [state, filterState])
  
  return (
    <div className='app-container font-sans'>
      <div className={`absolute z-50 transform transition-transform duration-700 h-screen sm:hidden ${!isSideBarActive ? '-translate-x-full absolute z-50' : ''}`}>
      <SidebarContext.Provider value={setIsSideBarActive}>
          <Sidebar>
            <div className='flex justify-center text-center my-2'>
              <div className='absolute left-8 top-[55px]'><Search size={20} strokeWidth={2} /></div>
              <input 
                type="text" 
                className='border-2 rounded-md pl-8' placeholder='Search...'
                
              />
            </div>
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
          {/* <div className='ml-3'>
            <div><p className='text-sm font-semibold'>Priority</p></div>
            <div className='mt-2 text-xl'>
              <div className='flex'>
                <input type="checkbox" />
                <p className='px-1'>High</p>
              </div>
              <div className='flex'>
                <input type="checkbox" />
                <p className='px-1'>Medium</p>
              </div>
              <div className='flex'>
                <input type="checkbox" />
                <p className='px-1'>Low</p>
              </div>
            
            </div>
          </div> */}
           </Sidebar> 
          </SidebarContext.Provider>
      </div>
    
    <div className={`sm:hidden
      ${!isSideBarActive 
      ? 
      'sticky z-40 transform transition-transform duration-700 translate-y-0 top-0' 
      : 
      '-translate-y-full transform transition-transform duration-700'} pl-2 pt-2 flex justify-between border-b-2 pb-3 bg-slate-100 `
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
    
    
    <div className={`flex justify-start`}>
      <div className={`hidden sm:block absolute -translate-x-full`}>
        <SidebarContext.Provider value={setIsSideBarActive}>
            <Sidebar>
              <div><p className='text-sm font-semibold ml-3'>Tasks</p></div>
                <SidebarItem 
                  icon={<ChevronsRight size={SIZE_OF_SIDEBAR_ICONS}/>} 
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
                    /> 
                  );
                }
                )}
                <AddNewList/>
              </div>
            {/* <div className='ml-3'>
              <div><p className='text-sm font-semibold'>Priority</p></div>
              <div className='mt-2 text-xl'>
                <div className='flex'>
                  <input type="checkbox" />
                  <p className='px-1'>High</p>
                </div>
                <div className='flex'>
                  <input type="checkbox" />
                  <p className='px-1'>Medium</p>
                </div>
                <div className='flex'>
                  <input type="checkbox" />
                  <p className='px-1'>Low</p>
                </div>
              
              </div>
            </div> */}
            </Sidebar>
          </SidebarContext.Provider>
        </div>
      
      <div className='h-screen w-full p-2 '>
          <div className={`${state.isTaskTabOpen ? 'absolute z-10 blur-xl' : ''}
          ${isSideBarActive ? 'blur-sm' : ''}`}>
            {filterState.filter == 'Upcoming' && <Upcoming />}
            {filterState.filter == 'Today' && <TodayTasks />}
            {filterState.filter == 'Calendar' && <Calendar />}
            {filterState.filter == 'Notes' && <StickWall />}
          </div>
          <div className={`transition-transform duration-700
            ${state.isTaskTabOpen
              ? 'relative z-40 transform opacity-100'
              : 'absolute z-40 -translate-y-full transform opacity-0'}
            `}>
            {state.isTaskTabOpen && <TaskInfoBar />}
          </div>
      </div>
      
    </div>
          
  </div>
  );
}

export default App;

