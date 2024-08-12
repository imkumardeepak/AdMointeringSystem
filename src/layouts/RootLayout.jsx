import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar';

function RootLayout({ children }) {
  const location = useLocation();

  // Determine if the current route should have a sidebar
  const showSidebar = location.pathname !== '/screen1';

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && (
        <div className="overflow-y-auto h-full">
          <Sidebar />
        </div>
      )}
      <main className={`flex-1 py-0 px-1 overflow-y-auto ${!showSidebar ? 'w-full' : ''}`}>
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
