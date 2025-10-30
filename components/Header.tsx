import React from 'react';
import { UserInfo } from '../types';
import SparkleIcon from './icons/SparkleIcon';

interface HeaderProps {
  user: UserInfo;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <SparkleIcon className="h-7 w-7 text-purple-400" />
            <span className="text-xl font-bold text-white">Gemini Image Generator</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img className="h-8 w-8 rounded-full" src={user.picture} alt={user.name} />
              <span className="text-sm font-medium text-gray-300 hidden sm:block">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
