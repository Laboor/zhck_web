const logMessage = {
  request: {
    onFulfilled: (config) => {
      console.log('请求参数:', config);
      console.time('请求耗时');
      return config;
    },
    onRejected: (error) => {
      console.error('请求错误：', error);
      return Promise.reject(error);
    },
  },
  response: {
    onFulfilled: (response) => {
      console.log('响应结果:', response);
      console.timeEnd('请求耗时');
      return response;
    },
    onRejected: (error) => {
      console.error('响应错误：', error);
      console.timeEnd('请求耗时');
      return Promise.reject(error);
    },
  },
};

export default logMessage;
