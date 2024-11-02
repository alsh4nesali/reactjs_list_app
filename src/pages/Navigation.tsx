import { useAuth } from "../auth/Auth";
import { Navigate } from "react-router-dom";
import Logo from '../assets/logo.svg';

function Navigation() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    // Using a state or navigate method would be better for navigation
  };

  return (
    <nav className="bg-gray-800 p-8 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-white font-bold flex items-center" href="/Home">
          <img src={Logo} alt="Logo" width='90px' />
        </a>
        <div className="hidden md:flex space-x-4">
          <a className="text-white hover:text-gray-300" href="/Home">Home</a>
          <a className="text-white hover:text-gray-300" href="/Dashboard">Dashboard</a>
          <a className="text-white hover:text-gray-300" href="/addTask">New Task</a>
          <a className="text-white hover:text-gray-300" href="#" onClick={handleLogout}>Logout</a>
        </div>
        {/* Hamburger button for mobile view */}
        <button className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {/* Dropdown menu for mobile */}
      <div id="navbarMenu" className="hidden md:hidden">
        <div className="bg-gray-700 p-4 space-y-2">
          <a className="text-white block hover:text-gray-300" href="/Home">Home</a>
          <a className="text-white block hover:text-gray-300" href="/Dashboard">Dashboard</a>
          <a className="text-white block hover:text-gray-300" href="/addTask">New Task</a>
          <a className="text-white block hover:text-gray-300" href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
