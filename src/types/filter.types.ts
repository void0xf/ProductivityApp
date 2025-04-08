export interface FilterState {
  filter: string;
  listFilter: string;
  tagsFilter: string[];
}

export type FilterType =
  | "Upcoming"
  | "Today"
  | "Late"
  | "Statistics"
  | "Calendar"
  | "Notes";
