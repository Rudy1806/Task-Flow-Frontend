"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter
} from "next/navigation";
import { useEffect, useState } from "react";
import { NotificationService }
from "@/services/notification.service";
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";


const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: ClipboardList,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];
export default function Sidebar() {
    const [unreadCount, setUnreadCount] =
      useState(0);
    
    useEffect(() => {

  const loadNotifications =
    async () => {

      const response =
        await NotificationService
          .getNotifications();

      const unread =
        response.data.filter(
          (n: any) => !n.is_read
        ).length;

      setUnreadCount(unread);
    };

  loadNotifications();

}, []);
  const pathname = usePathname();

 const logoutStore = useAuthStore(
  (state) => state.logout
);

  const router = useRouter();
  const handleLogout = () => {
  logoutStore();

  router.push("/login");
};
  return (
    <aside className="w-64 border-r border-neutral-200 bg-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <h1 className="text-2xl font-bold text-black">
          TaskFlow
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2 text-black">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  pathname === link.href
                    ? "bg-black text-white"
                    : "hover:bg-neutral-100"
                }`}
              >
                <Icon size={18} />
                <div className="flex items-center justify-between w-full">
                <span>{link.name}</span>

                {link.name === "Notifications" &&
                unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                </span>
                )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 text-black"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}