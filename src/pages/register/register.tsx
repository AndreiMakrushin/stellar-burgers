import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  registerUser,
  selectUserError,
  selectIsSuccessRegistration,
} from '@services/slices/user-slice';
import type { AppDispatch } from '@/services/store';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const isSuccess = useSelector(selectIsSuccessRegistration);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ name: userName, email, password }));
  };

  useEffect(() => {
    if (isSuccess) {
      void navigate('/login', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <RegisterUI
      errorText={error?.message ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
