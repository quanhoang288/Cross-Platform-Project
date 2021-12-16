import api from './api';

const addPost = async (postData, token) => {
    const createResult = await api({
        method: 'POST',
        url: '/posts/create',
        data: postData,
        headers: { Authorization: `Bearer ${token}` }
    });
    return createResult;
}

const getListPost = async (userId = null, token, page = 1) => {
    const url = userId ? `/posts/list?userId=${userId}&page=${page}` : `/posts/list?page=${page}`;
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}

const getPost = async (postId, token) => {
    const getResult = await api({
        method: 'GET',
        url: `/posts/show/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return getResult;
}

const editPost = async (postId, postData, token) => {
    const editResult = await api({
        method: 'POST',
        url: `/posts/edit/${postId}`,
        data: postData,
        headers: { Authorization: `Bearer ${token}` }
    });
    return editResult;
}

export {addPost, editPost, getListPost, getPost};