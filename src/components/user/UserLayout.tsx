import { Outlet } from 'react-router-dom';
import UserNavbar from '@/components/user/UserNavbar';
import UserFooter from '@/components/user/UserFooter';
import ScrollRails from '@/components/user/ScrollRails';
import { ScrollSectionProvider } from '@/contexts/ScrollSectionContext';

const UserLayout = () => {
  return (
    <ScrollSectionProvider>
      <div className="min-h-screen bg-white">
        <UserNavbar />
        <ScrollRails />
        <main>
          <Outlet />
        </main>
        <UserFooter />
      </div>
    </ScrollSectionProvider>
  );
};

export default UserLayout;
