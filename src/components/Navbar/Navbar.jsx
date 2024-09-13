import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import Logo from '/logo.jpeg';
import 'antd/dist/reset.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../states/slices/authSlice';

const Navbar = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserData(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        {userData.name || 'Default Name'}
      </Menu.Item>
      <Menu.Item key="1" icon={<MailOutlined />}>
        {userData.email || 'Default Email'}
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
    <nav className="bg-white shadow-sm p-3 md:pl-12 lg:pl-12 flex items-center justify-between">
      <div className="text-2xl font-bold flex flex-row items-center">
        <img src={Logo} className="w-12 h-12 mr-4" alt="Logo" />
        <p>IrusriTodo__ </p>
      </div>

      <Dropdown overlay={menuItems} trigger={['hover']}>
        <div className="flex items-center cursor-pointer">
          <Avatar icon={<UserOutlined />} className="mr-1 md:mr-12 lg:mr-12" />
        </div>
      </Dropdown>
    </nav>
    </>
  );
};

export default Navbar;
