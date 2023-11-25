import './App.css';
import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TaskProvider, useTaskContext } from './contexts/tasks.context';
import { Button } from '@mui/joy';
import { BarChart } from 'lucide-react';
import Sidebar from './components/menu-bar/menu-bar.component';
import { SidebarItem } from './components/menu-item/menu-item.component';

function App() {
  const { state, dispatch } = useTaskContext();


  return (
    <div className='app-container'>
    <div className="app flex justify-between">
      <Sidebar>
        <SidebarItem 
          icon={<BarChart size={20}/>} 
          text="Statistics" 
          active/>
      </Sidebar>
        <TaskBar />
      <TaskInfoBar/>
    </div>
    </div>
  );
}

export default App;

