import cryptoJS from 'crypto-js';

const withToken = {
  onFulfilled: (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      const tokenArr = userInfo.token.split('.');
      // 是否有效的JWT格式
      if (tokenArr.length === 3) {
        const jwtPayload = JSON.parse(window.atob(tokenArr[1])); // base64解码
        const authRouteHash = cryptoJS
          .MD5(JSON.stringify(userInfo.authRoute))
          .toString(); // 将异步路由进行MD5摘要计算
        jwtPayload.authRouteHash = authRouteHash; // 重新赋值路由hash，以校验路由有效性，防篡改
        tokenArr[1] = window.btoa(jwtPayload); // base64编码
        config.headers.Authorization = 'Bearer ' + tokenArr.join('.');
      }
    }
    return config;
  },
};

export default withToken;
