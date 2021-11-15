import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet } from 'react-native';
import { Avatar, Button, Icon, Image, Text } from 'react-native-elements'
import { CarouselSwipe, CarouselTest } from '../common';
import { useNavigation } from '@react-navigation/native';
import { stacks } from '../../constants/title';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/reducers/modalReducer';
import { types } from '../../constants/modalTypes';

const PostItem = ({post, actionLike, handleShowMore}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}> 
                <View style={styles.profileSection}>
                    <Avatar
                        rounded
                        source={{
                            uri: post.author.avatar.fileName,
                        }}
                    />
                    <View style={styles.nameTimeLine}>
                        <Text style={{fontWeight: 'bold'}}>{post.author.username}</Text>
                        <Text>{post.createdAt}</Text>
                    </View>
                </View>
                <Icon 
                    type='feather' 
                    name='more-horizontal' 
                    size={32} 
                    iconStyle={{marginRight: 6}}
                    style={{marginRight: 6}} 
                    onPress={() => {
                        dispatch(showModal({
                            modalType: types.postAdvance,
                            propsData: {
                                postId: 1,
                            },
                        }))
                    }}
                />
            </View>

            <View style={styles.postContent}>
                <Text style={styles.textContent}> 
                    {post.described}
                </Text>
                {/* { content.imageURI && <Image
                    source={{
                        uri: content.imageURI,
                    }}    
                    alt="Post image"
                    style={{height: 256, maxHeight: 256, width: '100%'}}
                />
                } */}
                <CarouselSwipe/>
            </View>

            
            <View style={styles.iconGroup}>
                <View style={styles.icon} >
                    <Icon 
                        type='font-awesome' 
                        name={post.isLike ? 'heart' : 'heart-o'}
                        size={28} 
                        onPress={() => actionLike(post._id)}
                        color={post.isLike ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'}
                    />    
                    <Text style={styles.count}>{post.like.length}</Text>
                </View>
                <View style={styles.icon}>
                    <Icon 
                        type='font-awesome' 
                        name='comment-o' 
                        size={28} 
                        onPress={() => navigation.navigate(stacks.comment.name, {
                            postId: post._id,
                        })}
                    />
                    <Text style={styles.count}>{post.countComments}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        marginLeft: 6,
        marginBottom: 10,
        paddingTop: 6,
        alignItems: 'flex-start',
    },
    profileSection: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameTimeLine: {
        marginLeft: 6,
    },
    postContent: {
        flex: 1,
        // marginBottom: 4,
    },
    textContent: {
        marginHorizontal: 6,
        marginBottom: 10,
    },
    iconGroup: {
        marginLeft: 6,
        // width: "40%",
        // justifyContent: "space-between",
        flexDirection: 'row',
        marginBottom: 10,
    },
    icon: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        
    },
    count: {
        marginLeft: 4
    }
});

PostItem.propTypes = {
    
};

export default PostItem;