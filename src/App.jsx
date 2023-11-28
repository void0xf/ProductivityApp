import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TaskProvider, useTaskContext } from './contexts/tasks.context';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-bar/menu-item/menu-item.component';
import { ChevronsRight, ListChecks, CalendarDays, StickyNote, User, Briefcase } from 'lucide-react';

const componentMap = {
  'Personal': User,
  'Work': Briefcase
  // Add other components and their names here
};

function App() {
  const { state, dispatch } = useTaskContext();


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
          icon={<ListChecks size={15}/>} 
          text="Today" 
          />
        <SidebarItem 
          icon={<CalendarDays size={15}/>} 
          text="Calendar" 
          alert
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

