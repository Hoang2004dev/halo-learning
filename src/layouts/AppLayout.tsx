// AppLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-gray-800 dark:text-gray-200 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
