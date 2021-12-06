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
        data: {phonenumber, username, password}
    });
    return registerInfo
}

const changePassword = async(currentPassword, newPassword,token) => {
  const password = await api({
    method: "POST",
    url: 'users/change-password',
    data: {currentPassword, newPassword},
    headers: { Authorization: `Bearer ${token}` }
  })
  return password;
}

const editInformation = async(userInfo, token) =>{

  // const {
  //   username,
  //   gender,
  //   birthday,
  //   address,
  // } = userInfo;

  const newInformation = await api({
    method: "POST",
    url: 'users/edit',
    data: userInfo,
    headers: { Authorization: `Bearer ${token}` }
  })
  return newInformation;
}

export { login, register, changePassword };


