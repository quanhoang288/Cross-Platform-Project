import React from "react";
import PropTypes from "prop-types";
import ListFriend from "./ListFriend";
import FriendRequest from "./FriendRequest";
import { CustomTabView } from "../../components/common";

const FriendTabs = (props) => {
  const routes = [
    { key: "friends", title: "Friends", component: ListFriend },
    {
      key: "friendRequests",
      title: "Friend Requests",
      component: FriendRequest,
    },
  ];
  return <CustomTabView routes={routes} />;
};

export default FriendTabs;
