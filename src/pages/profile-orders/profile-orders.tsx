import { ProfileOrdersUI } from '@ui-pages';
import { selectOrders, getOrders } from '@services/slices/order-slice';
import { useDispatch, useSelector } from '@/services/store';
import type { TOrder } from '@utils-types';
import { useEffect } from 'react';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(getOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
