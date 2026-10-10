import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';

import {
  loginUser,
  selectUserError,
  selectIsAuthenticated,
} from '@services/slices/user-slice';
import type { AppDispatch } from '@/services/store';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      void navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error?.message ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
