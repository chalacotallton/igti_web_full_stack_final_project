import http from '../http-common';

const hello = () => {
  return http.get('/');
}

export default {
  hello,
}