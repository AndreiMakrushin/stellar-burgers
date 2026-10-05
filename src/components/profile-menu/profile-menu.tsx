import { logoutUser } from '@services/slices/user-slice';
import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();

  const handleLogout = (): void => {
    // TODO: Разлогинить пользователя
    logoutUser();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
