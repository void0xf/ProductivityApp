import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TasksContext, useTaskContext } from './contexts/tasks.context';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-bar/menu-item/menu-item.component';
import { ChevronsRight, ListChecks, CalendarDays, StickyNote, User, Briefcase } from 'lucide-react';
import { GetTodayTasks } from './contexts/tasks.context';
import { useContext, useEffect, useState } from 'react';
import { TaskFilter, filtrTasks } from './contexts/filter.context'

const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

const handleListClick = (listName) => {
  console.log(listName);
}

function App() {
  const { state, dispatch } = useContext(TasksContext);
  const [ todayTasksCount, setTodayTasksCount] = useState(0);

  useEffect(() => {
    setTodayTasksCount(0);
    const date = new Date();
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();


    const currentDate = `${year}-${month}-${day}`;
    state.tasks.forEach((task) => { 
      if (currentDate === task.date) {
        setTodayTasksCount((prevCount) => prevCount + 1); 
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
            />
          <SidebarItem 
            icon={<StickyNote size={15}/>} 
            text="Notes"
            clickType={'Notes'} 
            />
        <div className='border-t-2 border-b-2 my-4 py-2'>
          <div><p className='text-lg'>Lists</p></div>
          {state.lists.map((listItem) => {
            const IconComponent = componentMap[listItem.name]; 
            return (
              <div>
                <SidebarItem 
                icon={<IconComponent size={15} />} 
                text={listItem.name}
                clickType={'list'}
                payload={listItem.name}
              /> 
              </div>
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

