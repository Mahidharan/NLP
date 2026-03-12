import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import UploadContract from './pages/UploadContract';
import ContractViewer from './pages/ContractViewer';
import ContractLibrary from './pages/ContractLibrary';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

function AppLayout({ children, onLogout }) {
  return (
    <div className="flex h-screen overflow-hidden bg-brand-950 relative text-brand-50">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-purple-200/30 rounded-full blur-[100px]"></div>
      </div>

      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 xl:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes Wrapper */}
        <Route path="/app/*" element={
          isAuthenticated ? (
            <AppLayout onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="upload" element={<UploadContract />} />
                <Route path="contract/:id" element={<ContractViewer />} />
                <Route path="library" element={<ContractLibrary />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
