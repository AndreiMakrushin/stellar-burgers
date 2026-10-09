import { ForgotPasswordUI } from '@ui-pages';
import { useState, useEffect, type SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import {
  forgotPasswordUser,
  selectIsSuccessForgotPassword,
  selectUserError,
} from '@services/slices/user-slice';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector(selectIsSuccessForgotPassword);
  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(forgotPasswordUser({ email }));
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('resetPassword', 'true');
      void navigate('/reset-password', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
