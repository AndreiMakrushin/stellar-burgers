import { selectUserName } from '@/services/slices/user-slice';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@/services/store';

export const AppHeader = (): React.JSX.Element => {
  const userName = useSelector(selectUserName);

  return <AppHeaderUI userName={userName} />;
};
