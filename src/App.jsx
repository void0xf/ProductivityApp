import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TasksContext, } from './contexts/tasks.context';
import { User, Briefcase, ChevronRight, ChevronLeft, LogIn } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { TaskFilter } from './contexts/filter.context'
import StickWall from './components/sticky-wall/stick-wall.component'
import Calendar from './components/calendar/calendar.component';
import Upcoming from './components/upcomingTasks/upcoming.component';
import TodayTasks from './components/todayTasks/today-Tasks.component';
import { getTasksForToday, getTasksForTommorow, synchonizeCompletedTasks, synchonizeNotes, synchonizeTasks } from './utils/task.utils';
import MobileSidebar from './components/sidebar/mobile-sidebar.component';
import ComputerSidebar from './components/sidebar/computer-sidebar.component';
import StatisticsTab from './components/statistics/statisticsTab.component';
import SettingCard from './components/setting/setting-card.component';
import { UserContext } from './contexts/user.context';
import Register from './components/loginpage/register.component';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase/firebaseConfig';
import { addDataToFirebase, getTasksByUID } from './firebase/firestore';
import Login from './components/loginpage/login.component';
import { StickyWallContext } from './contexts/sticky-wall.context';

const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

export const SidebarContext = createContext();

const handleCheckNOD = (tasks) => {
  const tasksForTommorow = getTasksForTommorow(tasks);
  
  if(tasksForTommorow.length > 0) {
    const notification = new Notification('Task For Tommorow', {
      body: `You have ${tasksForTommorow.length} upcoming Task For Tommorow`,
    });
  
  }
}

function App() {
  const SIZE_OF_SIDEBAR_ICONS = 19

  const { state, dispatch } = useContext(TasksContext);
  const { state:filterState } = useContext(TaskFilter);
  const { state:userContext } = useContext(UserContext);
  const { state:stickyWallState, dispatch: dispatchNotes } = useContext(StickyWallContext);
  const [ todayTasksCount, setTodayTasksCount] = useState(0);
  const [ isStickWallActive, setIsStickWallActive ] = useState(true);
  const [ isSideBarActive, setIsSideBarActive] = useState(false);
  const [ isMobile, setIsMobile] = useState(false);
  const [ isLoggedFirstTime, setIsLoggedFirstTime] = useState(true)
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { state:userState} = useContext(UserContext)
  const [ clickedLogin, setClickedLogin] = useState(false)
  
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

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
    if(user && !isLoggedFirstTime) {
      const uid = user.uid;
      addDataToFirebase(firestore, uid, state.tasks, state.completedTask, stickyWallState.StickyNote);
    }
  }, [state.tasks, state.completedTask, stickyWallState])

  useEffect(() => {
    if(user && isLoggedFirstTime){
      const uid = user.uid;
      const synchronize = async () => {
        const resSynchonizeTasks = await synchonizeTasks(firestore, uid, dispatch);
        const resSynchronizeCompletedTasks = await synchonizeCompletedTasks(firestore, uid, dispatch);
        const resSynchronzieNotes = await synchonizeNotes(firestore, uid, dispatchNotes)
        if(resSynchonizeTasks === 'Success' && resSynchronizeCompletedTasks === 'Success' && resSynchronzieNotes === 'Success') {
          setIsLoggedFirstTime(false);
        }
      }
      synchronize();
    }

  }, [user]);
  


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


  useEffect(() => {
    if(userContext.NOD){
      handleCheckNOD(state.tasks);
    }
  }, [userContext.NOD, state.tasks])

  
  return (
    user === null
    ?
    <div className='h-screen w-full bg-slate-600'>
      {clickedLogin 
      ?
      <Login setLogin={setClickedLogin}/>
      :  
      <Register setLogin={setClickedLogin}/>
      }
    </div>
    :
    (true &&
    <div className={`app-container bg-bkg text-textcolor font-sans ${isSideBarActive ? 'overflow-auto' : ''} ${!isMobile ? 'flex' : ''}`}>
      {
        userState.isSettingsCardOpen
        ?
        <SettingCard isMobile={isMobile}/>
        :
        null
      }
    
    <SidebarContext.Provider value={{isSideBarActive, setIsSideBarActive, isMobile}}>
      <div className={`${userState.isSettingsCardOpen ? 'blur-[6px]' : ''}`}>
      {
        isMobile
        ?
        <MobileSidebar />
        :
        <ComputerSidebar/>
      }
      </div>
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

          <div 
          className={`${state.isTaskTabOpen || (isSideBarActive && isMobile) || userState.isSettingsCardOpen  
            ? 'absolute blur-[22px]' 
            : ''}
          ${isSideBarActive ? '' : ''}`}>
            {filterState.filter == 'Upcoming' && <Upcoming />}
            {filterState.filter == 'Today' && <TodayTasks />}
            {filterState.filter == 'Calendar' && <Calendar />}
            {filterState.filter == 'Notes' && <StickWall />}
            {filterState.filter == 'Statistics' && <StatisticsTab />}
          </div>

          <div className={`transition-transform duration-700 z-50 
            ${state.isTaskTabOpen
              ? 'transform opacity-100 h-screen'
              : 'absolute -translate-y-full transform opacity-0'}
            `}>
            {state.isTaskTabOpen && <TaskInfoBar />}
          </div>


        </div>
    </div>
    )
  );
}

export default App;