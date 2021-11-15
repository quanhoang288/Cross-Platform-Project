import api from './api';

const actionLike = async (postId, token) => {
    const url = `postLike/action/${postId}`;
    const resultActionLike = await api({
        method: 'POST',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return resultActionLike;
};



export { actionLike };