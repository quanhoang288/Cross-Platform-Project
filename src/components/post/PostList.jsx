import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import PostItem from './PostItem';

const PostList = ({ posts, actionLike, refreshing, handleRefresh }) => {    
    return (
        <FlatList
            data={posts}
            renderItem={({item}) => {
                return (
                    <PostItem 
                        key={item._id}
                        post={item}
                        actionLike={actionLike}
                    />
                );
            }}  
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

PostList.propTypes = {
    
};

export default PostList;