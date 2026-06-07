import {
  Calendar,
  CheckSquare,
  FileText,
  Home,
  Music2,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  mobile?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home, mobile: true },
  { title: "Todos", url: "/todos", icon: CheckSquare, mobile: true },
  { title: "Notes", url: "/notes", icon: FileText, mobile: true },
  { title: "Calendar", url: "/calendar", icon: Calendar, mobile: true },
  { title: "Music", url: "/music", icon: Music2, mobile: false },
  { title: "Settings", url: "/settings", icon: Settings, mobile: true },
];

export const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.mobile);
