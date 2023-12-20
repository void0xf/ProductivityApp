import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TasksContext, } from './contexts/tasks.context';
import { User, Briefcase, ChevronRight, ChevronLeft } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { TaskFilter } from './contexts/filter.context'
import StickWall from './components/sticky-wall/stick-wall.component'
import Calendar from './components/calendar/calendar.component';
import Upcoming from './components/upcomingTasks/upcoming.component';
import TodayTasks from './components/todayTasks/today-Tasks.component';
import { getTasksForToday } from './utils/task.utils';
import MobileSidebar from './components/sidebar/mobile-sidebar.component';
import ComputerSidebar from './components/sidebar/computer-sidebar.component';

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
  const [ isSideBarActive, setIsSideBarActive] = useState(false);
  const [ isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    setTodayTasksCount(0);
    const tasksForToday = getTasksForToday(state.tasks);
    setTodayTasksCount(tasksForToday.length);
    if(windowSize < 640) {
      setIsMobile(true)
    }
    else{
      setIsMobile(false)
    }
  }, [state.tasks]);

  useEffect(() => {
    console.log(filterState, state)
  }, [filterState, state])

  const handleResizeWindow = (width) => {
    if(width > 640) {
      setIsMobile(false);
    }
    else {
      setIsMobile(true);
    }    
  }
  useEffect(() => {
    window.addEventListener('resize', () => {handleResizeWindow(window.innerWidth)});
  }, [])



  return (
    <div className={`app-container font-sans ${isSideBarActive ? 'overflow-auto' : ''} ${!isMobile ? 'flex' : ''}`}>
    
    <SidebarContext.Provider value={{isSideBarActive, setIsSideBarActive, isMobile}}>
      {
        isMobile
        ?
        <MobileSidebar />
        :
        <ComputerSidebar/>
      }
    </SidebarContext.Provider>

   
    
    
    {!isMobile
    ?
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
    :
    null}
    
      <div className='relative h-screen w-full p-2 z-10 mx-auto max-w-3xl'>
          <div className={`${state.isTaskTabOpen ? 'absolute blur-lg' : ''}
          ${isSideBarActive ? '' : ''}`}>
            {filterState.filter == 'Upcoming' && <Upcoming />}
            {filterState.filter == 'Today' && <TodayTasks />}
            {filterState.filter == 'Calendar' && <Calendar />}
            {filterState.filter == 'Notes' && <StickWall />}
          </div>
          <div className={`transition-transform duration-700 z-50
            ${state.isTaskTabOpen
              ? 'transform opacity-100'
              : 'absolute -translate-y-full transform opacity-0'}
            `}>
            {state.isTaskTabOpen && <TaskInfoBar />}
          </div>

      </div>
      
    </div>
  );
}

export default App;