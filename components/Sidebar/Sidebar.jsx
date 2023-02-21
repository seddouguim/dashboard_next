import style from "./Sidebar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

//ICONS
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CableIcon from "@mui/icons-material/Cable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <BarChartIcon />,
  },
  {
    title: "Devices",
    path: "/devices",
    icon: <CableIcon />,
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <CalendarMonthIcon />,
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    title: "Help Center",
    icon: <HelpCenterIcon />,
    path: "/helpcenter",
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <nav className={style.sidebar}>
      <ul>
        {menuItems.map((item, index) => {
          const className = router.pathname === item.path ? style.active : "";
          return (
            <li key={index}>
              <div className={style.padding_container}>
                <Link href={item.path} className={className}>
                  <span className={style.icon}>{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
