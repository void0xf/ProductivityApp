import { TasksState } from "./task.types";
import { FilterState } from "./filter.types";
import { SearchState } from "./search.types";
import { UIState } from "./ui.types";

export interface RootState {
  tasks: TasksState;
  filter: FilterState;
  search: SearchState;
  uiState: UIState;
}
