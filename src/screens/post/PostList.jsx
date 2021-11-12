import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PostItem } from '../../components/post';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { post } from '../../apis';

const PostList = props => {
    
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54dHVuZyIsImlkIjoiNjE4ZDJiNzQzNjhhZDgzYTk4YzgyMGMwIiwiaWF0IjoxNjM2NzI4NTc2fQ.ZowtOOrPquHHRWKLL_l8fAWdnP1q0Qde8JkiiOsNpu0";

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        post.getListPost(null, token)
        .then((result)=> {
            // console.log(result.data);
            const curPosts = result.data.data;
            setPosts(curPosts.map(post => {
                return {
                    author:{
                        name: post.author.username,
                        profileURI: post.author.avatar.fileName
                    },
                    content: {
                        id: post._id,
                        timestamp: post.createdAt,
                        textContent: post.described,
                        imageURI: 'https://i.scdn.co/image/ab67616d0000b273d6b89ae618df05a835f9e755',
                        numLikes: post.like,
                        numComments: post.countComments,
                    },
                }})
            );
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);
    


    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {posts.map(post => (
                    <PostItem 
                        key={post.content.id} 
                        author={post.author} 
                        content={post.content} 
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