import { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '@/store/modules/userInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalMessageContext } from '@/App';
import { Button } from 'antd';

function Login() {
  const loginStatus = useSelector((state) => state.userInfo.loginStatus);
  const message = useContext(GlobalMessageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    switch (loginStatus) {
      case 'succeeded':
        navigate('/', { replace: true });
        break;
      case 'failed':
        message.open({
          type: 'error',
          content: '登录失败，账号或密码错误！',
        });
        break;
      default:
        break;
    }
  }, [loginStatus, message, navigate]);

  const login = () => {
    dispatch(userLogin());
  };
  return (
    <Button type="primary" loading={loginStatus === 'logging'} onClick={login}>
      登录
    </Button>
  );
}

export default Login;
