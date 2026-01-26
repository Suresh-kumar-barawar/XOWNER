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
      {/* Desktop View - Wider and Shorter */}
      <div className="hidden md:fixed md:flex md:bottom-4 md:left-1/2 md:transform md:-translate-x-1/2 md:z-40">
        <div className="flex gap-6 px-8 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isSell = item.path === '/sell';
            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                className={`flex flex-col items-center transition-all duration-300 min-w-[60px] leading-none h-fit -mb-3 ${isSell ? 'relative -top-4' : ''}`}
              >
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${isSell
                      ? `p-4 ${active ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary shadow-md hover:bg-primary hover:text-white'}`
                      : `p-2.5 ${active ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-white/20 hover:text-primary'}`
                    }`}>
                  <Icon size={isSell ? 20 : 18} />
                </div>
                <span className={`text-xs font-medium leading-none ${active ? 'text-primary' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile View - White Rectangular */}
      <div className="block md:hidden w-full fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-center items-center bg-white shadow-lg border-t border-gray-200 px-3 py-1 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isSell = item.path === '/sell';
            const isChat = item.path === '/chat';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center transition-all duration-300 ${isSell ? 'absolute -top-6' : isChat ? 'flex-1 mr-8' : index === 3 ? 'ml-8 flex-1' : 'flex-1'
                  }`}
              >
                <div className={`flex items-center justify-center rounded-full ${isSell
                    ? 'p-3 bg-primary text-white shadow-xl w-14 h-14'
                    : active
                      ? 'p-2 bg-primary text-white shadow-md'
                      : 'p-2 text-gray-600 hover:text-primary'
                  }`}>
                  <Icon size={isSell ? 24 : 18} />
                </div>
                <span className={`text-xs mt-0 font-medium ${active ? 'text-primary' : 'text-gray-600'
                  }`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
