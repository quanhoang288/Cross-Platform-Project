import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PostItem } from '../../components/post';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { post, like, comment } from '../../apis';

const PostList = props => {
    // userId
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54dHVuZyIsImlkIjoiNjE4ZDJiNzQzNjhhZDgzYTk4YzgyMGMwIiwiaWF0IjoxNjM2NzI4NTc2fQ.ZowtOOrPquHHRWKLL_l8fAWdnP1q0Qde8JkiiOsNpu0";

    // API getPosts
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        post.getListPost(null, token)
        .then((result)=> {
            // console.log(result.data);
            const curPosts = result.data.data;
            setPosts(curPosts);
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);
    
    // API like
    const actionLike = (postId) => {
        like.actionLike(postId, token)
        .then(result => {
            // console.log(result.data);
            const curLikes = result.data.data.like;  //numLikes
            const curIsLike = result.data.data.isLike;
            setPosts(posts.map(post => {
                if(post._id === postId){
                    return{
                        ...post,
                        like: curLikes,
                        isLike: curIsLike,
                    };
                }
                return post; 
            }));
        })
        .catch(error => {
            console.log(error);
        })
    }
        
    // API getComment


    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {posts.map(post => (
                    <PostItem 
                        key={post._id} 
                        post = {post}
                        actionLike={actionLike}
                    />
                ))}
            </View>
        </ScrollView>
        </>
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