import { FC, useMemo } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectOrders,
  selectTotal,
  selectTotalToday
} from '../../slices/ordersSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectOrders);
  const feed = {
    total: useSelector(selectTotal),
    totalToday: useSelector(selectTotalToday)
  };

  const readyOrders = useMemo(() => getOrders(orders, 'done'), orders);

  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), orders);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
