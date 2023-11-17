import './App.css';
import MenuBar from './components/menu-bar/menu-bar.component';
import TaskBar from './components/task-bar/task-bar.component';
import TaskInfoBar from './components/task-info-bar/task-info-bar.component';


function App() {
  return (
    <div className="app">
     <MenuBar/>
      <TaskBar />
      <TaskInfoBar />     
    </div>
  );
}

export default App;
