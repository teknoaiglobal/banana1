
import React from 'react';
import { UserInfo } from '../types';
import GoogleIcon from './icons/GoogleIcon';
import SparkleIcon from './icons/SparkleIcon';

interface LoginProps {
  onLogin: (user: UserInfo) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // This is a mock login. In a real app, this would trigger the Google OAuth flow.
    const mockUser: UserInfo = {
      name: 'Alex Doe',
      email: 'alex.doe@example.com',
      picture: 'https://i.pravatar.cc/150?u=alexdoe',
    };
    onLogin(mockUser);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center">
          <SparkleIcon className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Gemini Image Editor</h1>
        <p className="text-gray-400">
          Sign in to start transforming your images with the power of AI.
        </p>
        <button
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center px-4 py-3 text-lg font-semibold text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <GoogleIcon />
          <span className="ml-4">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
