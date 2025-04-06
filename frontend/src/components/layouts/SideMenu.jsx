import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogOut();
      return;
    }
    navigate(route);
  };

  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="p-4 justify-center">
      <div className="mb-6 text-center">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="profile"
            className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || 'User'}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="font-semibold text-lg text-gray-800">
          {user?.fullName || 'User'}
        </h5>
      </div>

      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-2 rounded-md text-sm transition-colors ${
              activeMenu === item.label
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{React.createElement(item.icon)}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
