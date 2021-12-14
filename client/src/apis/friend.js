import api from './api';

const getListFriends = async(user_id=null, token) => {
    const url = `/friends/list`;
    const listFriends = await api({
        method: 'POST',
        url: url,
        data: {
            "user_id": user_id      // receiverID
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return listFriends;
}

const getListFriendRequests = async(token) => {
    const url = `friends/get-requested-friend`;
    const listFriendRequests = await api({
        method: 'POST',
        url: url,
        headers: {Authorization: `Bearer ${token}`}
    })
    return listFriendRequests;
}

const sendFriendRequest = async(user_id ,token) => {
    const url = `friends/set-request-friend`;
    const sendRequestResult = await api({
        method: 'POST',
        url: url,
        data: {
            "user_id": user_id,     // receiverID
        },
        headers: {Authorization: `Bearer ${token}`}
    })
    return sendRequestResult;
}

const acceptFriendRequest = async(user_id , is_accept, token) => {
    const url = `friends/set-accept`;
    const Result = await api({
        method: 'POST',
        url: url,
        data: {
            "user_id": user_id,         // receiverID
            "is_accept": is_accept      // is_accept = "1"  : accept friend request
                                        // is_accept = "2"  : refuse friend request
        },
        headers: {Authorization: `Bearer ${token}`}
    })
    return Result;
}

const removeFriend = async(user_id ,token) => {
    const url = `friends/set-remove`;
    const removeResult = await api({
        method: 'POST',
        url: url,
        data: {
            "user_id": user_id,     // receiverID
        },
        headers: {Authorization: `Bearer ${token}`}
    })
    return removeResult;
}

export { getListFriends, getListFriendRequests, sendFriendRequest, acceptFriendRequest, removeFriend };