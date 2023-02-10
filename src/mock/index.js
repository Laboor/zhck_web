import Mock from 'mockjs';
import login from './data/login';
import authVerification from './data/authVerification';
import api from '@/config/api';

// 响应延时配置
Mock.setup({
	timeout: '200-500',
});

// 配置Mock API
const BASE_URL = 'http://localhost:3000';
Mock.mock(BASE_URL + api.login, login);
Mock.mock(BASE_URL + api.authVerification, authVerification);

export default Mock;
