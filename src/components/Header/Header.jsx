import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        <div className="flex items-center">
          <svg className="h-8 w-8 mr-2 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
            {/* Your logo SVG or icon */}
          </svg>
          <span className="font-semibold text-xl tracking-tight">Your Site Name</span>
        </div>
        <nav className="md:flex items-center space-x-4">
          <ul className="flex items-center space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.active ? (
                  <Link to={item.slug} className="text-gray-300 hover:text-white">{item.name}</Link>
                ) : (
                  <button onClick={() => navigate(item.slug)} className="text-gray-300 hover:text-white">{item.name}</button>
                )}
              </li>
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
