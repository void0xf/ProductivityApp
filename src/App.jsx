import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TasksContext, useTaskContext } from './contexts/tasks.context';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-bar/menu-item/menu-item.component';
import { ChevronsRight, ListChecks, CalendarDays, StickyNote, User, Briefcase, Menu, CircleDot } from 'lucide-react';
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

const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

export const SidebarContext = createContext();

function App() {
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
    console.log(state)
  }, [state])
  



  const [shouldHideSidebar, setShouldHideSidebar] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;

    const handleTransitionEnd = () => {
      if (!isSideBarActive) {
        setShouldHideSidebar(true);
      }
    };

    sidebarElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      sidebarElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isSideBarActive]);

  useEffect(() => {
    // When isSideBarActive changes, make the sidebar visible before starting the transition
    if (isSideBarActive) {
      setShouldHideSidebar(false);
    }
  }, [isSideBarActive]);




  return (
    <div className='app-container font-sans'>
    <div className={`${isSideBarActive ? 'hidden' : ''} pl-2 pt-2 flex justify-between`}>
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
    {/* <div className={`transform ${!isSideBarActive ? '-translate-x-full' : ''} transition-transform`}> */}
    <div 
        ref={sidebarRef} 
        className={`transform transition-transform ${!isSideBarActive ? '-translate-x-full' : ''} ${shouldHideSidebar ? 'hidden' : ''}`}
      >
      <SidebarContext.Provider value={setIsSideBarActive}>
          <Sidebar>
            <div><p className='text-sm font-semibold ml-3'>Tasks</p></div>
              <SidebarItem 
                icon={<ChevronsRight size={15}/>} 
                text="Upcoming"
                alert
                numberOfAlerts={state.tasks.length}
                clickType={'Upcoming'}
                payload={'Upcoming'}
                />
              <SidebarItem 
                icon={<ListChecks size={15} alert/>} 
                text="Today"
                alert
                clickType={'Today'}
                payload={'Today'}
                numberOfAlerts={todayTasksCount}
                />
              <SidebarItem 
                icon={<CalendarDays size={15}/>} 
                text="Calendar" 
                alert
                clickType={'Calendar'}
                payload={'Calendar'}
                />
              <SidebarItem 
                icon={<StickyNote size={15}/>} 
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
                    icon={IconComponent ? <IconComponent size={15} /> : <CircleDot size={15} />} 
                    text={listItem.name}
                    clickType={'list'}
                    payload={listItem.name}
                  /> 
                );
              }
              )}
              <AddNewList/>
            </div>
          <div className='ml-3'>
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
          </div>
          </Sidebar>
        </SidebarContext.Provider>
      </div>
      <div className='contentContainer h-screen w-full p-2'>
          <div className={`${state.isTaskTabOpen ? 'hidden' : ''}`}>
            {filterState.filter == 'Upcoming' && <Upcoming />}
            {filterState.filter == 'Today' && <TodayTasks />}
            {filterState.filter == 'Calendar' && <Calendar />}
          </div>

          {state.isTaskTabOpen && <TaskInfoBar />}
      </div>
      
    </div>
    </div>
  );
}

export default App;

