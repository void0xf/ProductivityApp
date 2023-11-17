import './App.css';
import MenuBar from './components/menu-bar/menu-bar.component';
import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';
import { TaskProvider, useTaskContext } from './contexts/tasks.context';


function App() {
  const { state, dispatch } = useTaskContext();


  return (
    <div className="app">
      <MenuBar />
        <TaskBar />
      {state.isTaskTabOpen && <TaskInfoBar />}
    </div>
  );
}

export default App;
