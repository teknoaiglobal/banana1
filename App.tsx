
import React, { useState, useCallback } from 'react';
import { UserInfo } from './types';
import Login from './components/Login';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const handleLogin = useCallback((userInfo: UserInfo) => {
    setUser(userInfo);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        <ImageEditor />
      </main>
    </div>
  );
};

export default App;
