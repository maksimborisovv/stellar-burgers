import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(logout());
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
