import Mock from 'mockjs';
import login from './data/login';
import menu from './data/menu';

// 响应延时配置
Mock.setup({
	timeout: '200-500',
});

// 配置Mock API
const BASE_URL = 'http://localhost:3000';
Mock.mock(BASE_URL + '/login', login);
Mock.mock(BASE_URL + '/menu', menu);

export default Mock;
