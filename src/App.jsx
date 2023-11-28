import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TaskProvider, useTaskContext } from './contexts/tasks.context';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-bar/menu-item/menu-item.component';
import { ChevronsRight, ListChecks, CalendarDays, StickyNote, User, Briefcase } from 'lucide-react';
import { GetTodayTasks } from './contexts/tasks.context';
import { useEffect, useState } from 'react';
const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

function App() {
  const { state, dispatch } = useTaskContext();
  const [ todayTasksCount, setTodayTasksCount] = useState(0);

  useEffect(() => {
    setTodayTasksCount(0);
    const date = new Date();
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const currentDate = `${year}-${month}-${day}`;
    state.tasks.forEach((task) => { // Use forEach instead of map
      if (currentDate === task.date) {
        console.log(task);
        setTodayTasksCount((prevCount) => prevCount + 1); // Update state based on previous state
      }
    });
  }, [state.tasks]);

  return (
    <div className='app-container'>
    <div className="app flex justify-between">
      <Sidebar>
      <div><p className='text-sm font-semibold'>Tasks</p></div>
        <SidebarItem 
          icon={<ChevronsRight size={15}/>} 
          text="Upcoming" 
          />
        <SidebarItem 
          icon={<ListChecks size={15} alert/>} 
          text="Today"
          alert
          numberOfAlerts={todayTasksCount}
          />
        <SidebarItem 
          icon={<CalendarDays size={15}/>} 
          text="Calendar" 
          alert
          numberOfAlerts={10}
          />
        <SidebarItem 
          icon={<StickyNote size={15}/>} 
          text="Notes" 
          />
      <div className='border-t-2 border-b-2 my-4 py-2'>
        <div><p className='text-lg'>Lists</p></div>
        {state.lists.map((listItem) => {
          const IconComponent = componentMap[listItem.name]; 
          return (
            <SidebarItem 
              icon={<IconComponent size={15} />} 
              text={listItem.name}
            /> 
          );
        }
        )}
        


      </div>

      </Sidebar>
        <TaskBar />
      <TaskInfoBar/>
    </div>
    </div>
  );
}

export default App;

