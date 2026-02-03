import Navbar from '../components/Navbar';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="app-main">{children}</main>
    </>
  );
};

export default AppLayout;
