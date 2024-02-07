import React, { useContext } from 'react'
import ListOfTasksCard from '../upcomingTasks/ListOfTasksCard.component'
import { TasksContext } from '../../contexts/tasks.context'
import { getLateTasks } from '../../utils/task.utils'
import { TaskFilter } from '../../contexts/filter.context'
import { SearchContext } from '../../contexts/search.context'
import ComputerTitleCard from '../category-title-card/computer-title-card'

const LateTasks = () => {
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const {state: searchState} = useContext(SearchContext)
  const tasksToDisplay = getLateTasks(state.tasks, filterState.listFilter, searchState.search);

  return (
    <div>
      <ComputerTitleCard name={"LateTasks"} numberOfNotifictaions={tasksToDisplay.length > 0 ? tasksToDisplay.length : '-' }/>
      <ListOfTasksCard tasks={tasksToDisplay} name={"Late"} late={true} />
    </div>
  )
}

export default LateTasks
