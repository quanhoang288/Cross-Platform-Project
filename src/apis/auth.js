import api from './api';

const login = async (email, password) => {
  const loginInfo = await api({
    method: 'POST',
    url: '/users/login',
    data: { email, password },
  });
  return loginInfo;
};

const register = async (phonenumber, username, password) => {
    const registerInfo = await api({
        method: 'POST',
        url: '/users/register',
        data: {phonenumber, username, password}
    });
    return registerInfo
}

export { login, register };


