import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  closeOrder,
  createOrder,
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = {
    bun: useSelector(selectConstructorBun),
    ingredients: useSelector(selectConstructorIngredients)
  };

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrder(constructorItems.ingredients.map((i) => i._id)));
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
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
