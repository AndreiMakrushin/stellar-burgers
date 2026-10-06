import { ProfileOrdersUI } from '@ui-pages';
import { selectOrders, getOrders } from '@services/slices/order-slice';
import { useSelector } from 'react-redux';
import { useDispatch } from '@/services/store';
import type { TOrder } from '@utils-types';
import { useEffect } from 'react';
import { getCookie } from '@/utils/cookie';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('accessToken')) {
      void dispatch(getOrders());
    }
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
