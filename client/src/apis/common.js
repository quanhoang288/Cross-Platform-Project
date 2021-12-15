import api from './api';

const fetchNextPage = (url, token, page) => {
  return api({
    method: 'GET',
    url: `${url}?page=${page}`,
    headers: { Authorization: `Bearer ${token}` }
  });
};

const refresh = (url, token) => {
  return api({
    method: 'GET',
    url: url,
    headers: { Authorization: `Bearer ${token}` }
  });
} 

export {fetchNextPage, refresh};
