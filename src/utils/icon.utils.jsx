import { User, Briefcase} from "lucide-react";


export const getIconComponentFromListName = (listName) => {
  const iconMap = {
    Personal : User,
    Work : Briefcase
  }
  const IconComponent = iconMap[listName];
  return IconComponent;
}