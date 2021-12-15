import api from './api';

const addComment = async (postId, content, token) => {
  const url = `/postComment/create/${postId}`;
  const createResult = await api({
    method: 'POST',
    url: url,
    data: {
      content: content,
      commentAnswered: null,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return createResult;
};

const getListComment = async (postId, token, offset = 0, limit = 10) => {
  const url = `/postComment/list/${postId}?offset=${offset}&limit=${limit}`;
  const listComment = await api({
    method: 'GET',
    url: url,
    headers: { Authorization: `Bearer ${token}` },
  });
  return listComment;
};

export { addComment, getListComment };
