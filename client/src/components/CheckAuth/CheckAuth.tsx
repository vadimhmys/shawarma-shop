import React, { ReactNode } from 'react';
import { check } from '../../http/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginUser } from '../../redux/slices/userSlice';
import { FaSpinner } from "react-icons/fa";

type CheckAuthPropsType = {
  children: ReactNode;
};

const CheckAuth: React.FC<CheckAuthPropsType> = ({children}) => {
  const dispath = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          dispath(loginUser(data));
        }
      })
      .finally(() => setChecking(false));
  }, [user, dispath]);

  if (checking) {
    return <FaSpinner/>;
  }

  return <>{children}</>;
};

export default CheckAuth;
