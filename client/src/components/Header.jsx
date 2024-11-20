import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { motion } from 'framer-motion';

export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenDB, setDropdownOpenDB] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleDropdownDB = () => {
    setDropdownOpenDB((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-light relative z-20 shadow-md">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container py-5 flex justify-between items-center"
      >
        <Link to="/">
          <h1 className="font-bold text-2xl ml-5">Education System</h1>
        </Link>

        <div className="hidden mr-5 lg:block">
          <ul className="flex items-center gap-1">
            <Link to="/">
              <li className="inline-block py-2 px-3 hover:text-secondry relative group">Home</li>
            </Link>
            <Link to="/about">
              <li className="inline-block py-2 px-3 hover:text-secondry relative group">About</li>
            </Link>
            {currentUser && (
              <>
                <Link to="/curriculum">
                  <li className="inline-block py-2 px-3 hover:text-secondry relative group">Curriculum</li>
                </Link>
                <Link to="/teacher">
                  <li className="inline-block py-2 px-3 hover:text-secondry relative group">Teachers</li>
                </Link>
              
                <div className="relative">
                  <div className="flex items-center gap-2 cursor-pointer mr-3" onClick={toggleDropdownDB}>
                    <p>Dashboard</p>
                  </div>
                  {isDropdownOpenDB && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link to="/classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Classes</Link>
                      <Link to="/schedules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Schedules</Link>
                      <Link to="/tasks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tasks</Link>
                      <Link to="/extracurricular" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Extracurricular</Link>
                    
                      </div>
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{currentUser.name}</span>
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
            {!currentUser && (
              <>
                <Link to="/sign-in">
                  <li className="inline-block py-2 px-3 hover:text-secondry relative group">Sign In</li>
                </Link>
                <Link to="/sign-up">
                  <li className="inline-block py-2 px-3 hover:text-secondry relative group">Register</li>
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <IoMdMenu className="text-4xl cursor-pointer" onClick={toggleMobileMenu}/>
          {isMobileMenuOpen && (
            <ul className="mob-nav flex items-center gap-3 absolute left-0 flex-col h-[300px] bg-[#f4f4f4] w-full z-40">
              <Link to="/">
                <li className="inline-block py-2 px-3 hover:text-secondry relative group">Home</li>
              </Link>
              <Link to="/about">
                <li className="inline-block py-2 px-3 hover:text-secondry relative group">About</li>
              </Link>
              {currentUser && (
                <>
                  <Link to="/curriculum">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Curriculum</li>
                  </Link>
                  <Link to="/classes">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Classes</li>
                  </Link>
                  <Link to="/teacher">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Teachers</li>
                  </Link>
                  <Link to="/schedules">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Schedule</li>
                  </Link>
                  <Link to="/tasks">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Tasks</li>
                  </Link>
                  <Link to="/extracurricular">
                    <li className="inline-block py-2 px-3 hover:text-secondry relative group">Extracurricular</li>
                  </Link>
                </>
              )}
              <Link to="/sign-in">
                <li className="inline-block py-2 px-3 hover:text-secondry relative group">Sign In</li>
              </Link>
              <Link to="/sign-up">
                <li className="inline-block py-2 px-3 hover:text-secondry relative group">Register</li>
              </Link>
            </ul>
          )}
        </div>
      </motion.div>
    </nav>
  );
}