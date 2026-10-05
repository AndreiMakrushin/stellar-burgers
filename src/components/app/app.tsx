import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoading,
  selectError,
} from '@/services/slices/ingredient-slice';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute,
} from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
} from '@pages';
import { Preloader } from '@ui';

import type { AppContentProps } from './type';
import type { AppDispatch } from '@/services/store';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIsLoading);
  const ingredientsError = useSelector(selectError);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent
        ingredients={ingredients}
        isLoading={isIngredientsLoading}
        error={ingredientsError}
      />
    </div>
  );
};

export default App;

const AppContent = ({
  ingredients,
  isLoading,
  error,
}: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты
        {error.message ? `: ${error.message}` : '.'}
      </p>
    );
  }

  if (!ingredients.length) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Нет ингредиентов</p>
    );
  }

  return <RouteComponent />;
};

const RouteComponent = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/feed" element={<Feed />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/orders"
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound404 />} />
      <Route
        path="/feed/:number"
        element={
          <Modal title="Детали заказа" onClose={(): void => console.log('close')}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path="/ingredients/:id"
        element={
          <Modal title="Детали заказа" onClose={(): void => console.log('close')}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path="/profile/orders/:number"
        element={
          <ProtectedRoute>
            <Modal title="Детали заказа" onClose={(): void => console.log('close')}>
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
