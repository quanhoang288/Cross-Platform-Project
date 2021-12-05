import api from './api';

const searchFriend = async(keyword, token) => {
    const url = `/users/search`;
    const result = await api({
        method: 'POST',
        url: url,
        data: {
            "keyword": keyword
        },
        headers: { Authorization: `Bearer ${token}`}
    })
    return result;
}

export {searchFriend} ;