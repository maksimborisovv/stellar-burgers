import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrdersAll,
  selectIsLoading,
  selectOrders
} from '../../slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, []);

  const orders: TOrder[] = useSelector(selectOrders);
  const isLoading: boolean = useSelector(selectIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchOrdersAll());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
