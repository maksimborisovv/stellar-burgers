import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  selectProfileOrders
} from '../../slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectProfileOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
