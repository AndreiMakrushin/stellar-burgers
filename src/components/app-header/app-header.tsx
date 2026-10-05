import { selectUserName } from '@/services/slices/user-slice';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  const userName = useSelector(selectUserName);

  return <AppHeaderUI userName={userName} />;
};
