import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PostAdvanceModal from './PostAdvanceModal'
import { types } from '../../../constants/modalTypes';
import PostReportModal from './PostReportModal'
import ConfirmDialog from './ConfirmDialog';

const RootModal = props => {
    const modal = useSelector(state => state.modal);
    
    // console.log('modal: ', modal);
    switch (modal.type) {
        case types.postAdvance: 
            return (
                <PostAdvanceModal {...modal.data}/>
            );
            
        case types.postReport: 
            return (
                <PostReportModal {...modal.data}/>
            );
        
        case types.confirm: 
            return <ConfirmDialog {...modal.data}/>
        
        default: 
            return null;
    }
    
};

export default RootModal;