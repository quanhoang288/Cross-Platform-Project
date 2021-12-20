import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PostAdvanceModal from './PostAdvanceModal';
import { types } from '../../../constants/modalTypes';
import PostReportModal from './PostReportModal';
import ConfirmDialog from './ConfirmDialog';
import FriendAdvanceModal from './FriendAdvanceModal';
import RespondModal from './RespondModal';

const RootModal = (props) => {
  const modal = useSelector((state) => state.modal);

  switch (modal.type) {
    case types.postAdvance:
      return <PostAdvanceModal {...modal.data} />;

    case types.postReport:
      return <PostReportModal {...modal.data} />;

    case types.friendAdvance:
      return <FriendAdvanceModal {...modal.data} />;

    case types.confirm:
      return <ConfirmDialog {...modal.data} />;

    case types.respondModal:
      return <RespondModal {...modal.data} />;

    default:
      return null;
  }
};

export default RootModal;
