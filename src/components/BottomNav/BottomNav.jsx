import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosChatbubbles } from "react-icons/io";
import { FaSellcast } from "react-icons/fa";
import { RiExchange2Fill } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/chat', icon: IoIosChatbubbles, label: 'Chat' },
    { path: '/sell', icon: FaSellcast, label: 'Sell' },
    { path: '/exchange', icon: RiExchange2Fill, label: 'Exchange' },
    { path: '/help', icon: FaHandsHelping, label: 'Help' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop View - Smaller */}
      <div className="hidden md:fixed md:flex md:bottom-6 md:left-1/2 md:transform md:-translate-x-1/2 md:z-40">
        <div className="flex gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/20 hover:text-primary'
                }`}
                title={item.label}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Same as Desktop */}
      <div className="md:hidden w-full fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 p-2">
        <div className="flex gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg justify-evenly">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/20 hover:text-primary'
                }`}
                title={item.label}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
