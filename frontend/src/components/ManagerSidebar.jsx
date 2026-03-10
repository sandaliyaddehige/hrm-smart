import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoSettings, IoLogOutOutline } from "react-icons/io5";

const navItems = [
  { id: "dashboard",   label: "Dashboard",   icon: MdDashboard },
  { id: "employees",   label: "Employees",   icon: FaUsers },
  { id: "attendance",  label: "Attendance",  icon: BsCalendarCheck },
  { id: "performance", label: "Performance", icon: AiOutlineBarChart },
  { id: "settings",    label: "Settings",    icon: IoSettings },
];

export default function ManagerSidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8 px-2">
        <img
          src="/logo.png"
          alt="Advera HR Logo"
          className="w-28 h-auto object-contain"
        />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-xl transition-all shadow-sm hover:shadow-md">
        <IoLogOutOutline size={18} />
        Logout
      </button>
    </aside>
  );
}