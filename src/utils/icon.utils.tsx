import { User, Briefcase, LucideIcon } from "lucide-react";

export const getIconComponentFromListName = (
  listName: string
): LucideIcon | undefined => {
  const iconMap: Record<string, LucideIcon> = {
    Personal: User,
    Work: Briefcase,
  };

  return iconMap[listName];
};
