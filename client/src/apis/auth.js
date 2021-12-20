import api from './api';

const login = async (phonenumber, password) => {
  const loginInfo = await api({
    method: 'POST',
    url: '/users/login',
    data: { phonenumber, password },
  });
  return loginInfo;
};

const register = async (phonenumber, username, password) => {
  const registerInfo = await api({
    method: 'POST',
    url: '/users/register',
    data: { phonenumber, username, password },
  });
  return registerInfo;
};

const showInfo = async (userId = null, token) => {
  const url = userId ? `/users/show/${userId}` : '/users/show';
  const userInfo = await api({
    method: 'GET',
    url: url,
    headers: { Authorization: `Bearer ${token}` },
  });
  return userInfo;
};

const changePassword = async (currentPassword, newPassword, token) => {
  const password = await api({
    method: 'POST',
    url: 'users/change-password',
    data: { currentPassword, newPassword },
    headers: { Authorization: `Bearer ${token}` },
  });
  return password;
};

const editInfo = async (userInfo, token) => {
  // const {
  //   username,
  //   gender,
  //   birthday,
  //   address,
  // } = userInfo;

  console.log('data', userInfo);

  const newInfo = await api({
    method: 'POST',
    url: 'users/edit',
    data: userInfo,
    headers: { Authorization: `Bearer ${token}` },
  });
  return newInfo;
};

export { login, register, showInfo, changePassword, editInfo };
