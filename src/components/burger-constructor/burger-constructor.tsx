import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  createOrder,
  selectOrderRequest,
  selectOrder,
} from '@services/slices/order-slice';
import {
  selectIngredients,
  selectBun,
  clearConstructor,
} from '@services/slices/constructor-slice';
import { useDispatch } from '@/services/store';
import { selectUser } from '@services/slices/user-slice';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { TConstructorIngredient, TConstructorState, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  /** TODO: Взять переменные constructorItems, orderRequest и orderModalData из стора */
  const ingredients = useSelector(selectIngredients);
  const bun = useSelector(selectBun);
  const constructorItems: TConstructorState = {
    bun,
    ingredients,
  };
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData: TOrder | null = useSelector(selectOrder);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      void navigate('/login');
      return;
    }

    const ids = [
      bun?._id,
      ...constructorItems.ingredients.map((item) => item._id),
      bun?._id,
    ] as string[];

    dispatch(createOrder(ids))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
