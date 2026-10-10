import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { authChecked, getUser } from '@/services/slices/user-slice';
import type { AppContentProps } from './type';
import type { AppDispatch } from '@/services/store';
import { getCookie } from '@utils/cookie';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIsLoading);
  const ingredientsError = useSelector(selectError);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      void dispatch(getUser());
    } else {
      dispatch(authChecked());
    }
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
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/feed" element={<Feed />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute onlyUnAuth>
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
        path="/feed/:id"
        element={
          <Modal
            title="Детали заказа"
            onClose={() => {
              void navigate(-1);
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path="/ingredients/:id"
        element={
          <Modal
            title={'Детали ингредиента'}
            onClose={() => {
              void navigate(-1);
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path="/profile/orders/:id"
        element={
          <ProtectedRoute>
            <Modal
              title="Детали заказа"
              onClose={() => {
                void navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
