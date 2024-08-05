import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  selectProfileOrders
} from '../../slices/profileOrdersSlice';
import { fetchOrdersAll } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
