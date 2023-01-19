import style from "./Sidebar.module.css";

import Link from "next/link";

//ICONS
import MedicationIcon from "@mui/icons-material/Medication";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

// MENU ICONS
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CableIcon from "@mui/icons-material/Cable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const menuItems = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
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
    ],
  },
  {
    title: "Others",
    items: [
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
    ],
  },
];

const Sidebar = () => {
  return (
    <nav className={style.sidebar}>
      {menuItems.map((item, index) => (
        <div key={index} className={index == 1 ? "middle-items" : ""}>
          <h2>{item.title}</h2>
          <ul>
            {item.items.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <span className={style.icon}>{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
