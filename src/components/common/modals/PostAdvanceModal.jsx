import React, { useEffect, useState } from 'react';
import BottomHalfModal from './BottomHalfModal';
import { View } from 'react-native';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../../redux/reducers/modalReducer';
import { types } from '../../../constants/modalTypes';
const PostAdvanceModal = ({ postId }) => {
    
    const dispatch = useDispatch();
    const ownPost = false;
    
    const handleHideModal = () => {
        setModalVisible(false);
    }

    const handleEditPost = () => {
        console.log(postId);
    }

    const handleReportPost = () => {
        dispatch(showModal({
            modalType: types.postReport,
            propsData: {}
        }))
    }

    const handleHidePost = () => {
        console.log(postId);
    }

    const handleDeletePost = () => {
        dispatch(showModal({
            modalType: types.confirm,
            propsData: {
                isModalVisible: true,
                title: 'Xóa bài viết',
                content: 'Bạn có chắc chắn muốn xóa bài viết?',
                yesOptionTitle: 'XÓA',
            }
        }))
    }

    const functionalities = ownPost ? [
        {
            title: 'Edit post',
            subTitle: 'Only text content is editable',
            icon: {
                type: 'feather',
                name: 'edit'
            },
            onPress: handleEditPost
        },
      
        {
            title: 'Delete post',
            subTitle: 'Delete this post',
            icon: {
                type: 'ant-design',
                name: 'delete'
            },
            onPress: handleDeletePost
        },
    ] : [
        
        
        {
            title: 'Delete post',
            subTitle: 'This post will be hidden from your newsfeed',
            icon: {
                type: 'ant-design',
                name: 'delete'
            },
            onPress: handleDeletePost
        },
        {
            title: 'Hide all posts from newsfeed',
            subTitle: 'All posts by this person will be hidden from your newsfeed',
            icon: {
                type: 'material-icon',
                name: 'cancel-presentation'
            },
            onPress: handleHidePost
        },
        {
            title: 'Report post',
            icon: {
                type: 'ant-design',
                name: 'warning'
            },
            onPress: handleReportPost
        },
    ];

    return (
        <BottomHalfModal 
            isModalVisible={true}
            hideModal={handleHideModal}
        >
            <View style={{
                height: 250, 
                backgroundColor: '#fff',
                justifyContent: 'center',
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
            }}>
                {
                    functionalities.map((func, idx) => (
                        <ListItem
                            key={idx}
                            onPress={func.onPress}
                        >
                            <Icon type={func.icon.type} name={func.icon.name} style={{marginRight: 4}}/>
                            <ListItem.Content>
                                
                                <ListItem.Title>
                                    {func.title}
                                </ListItem.Title>
                                {func.subTitle && 
                                    <ListItem.Subtitle>
                                        {func.subTitle}
                                    </ListItem.Subtitle> 
                                }
                            </ListItem.Content>
                        </ListItem>
                    ))
                    
                }
                
            </View>
        </BottomHalfModal>
    )
};



export default PostAdvanceModal;