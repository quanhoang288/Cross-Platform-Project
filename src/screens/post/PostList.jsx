import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PostItem } from '../../components/post';
import { Divider, Icon, ListItem, LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { post } from '../../apis';


const PostList = props => {
    const [progressVal, setProgressVal] = useState(0);
    const uploadStatus = useSelector(state => state.upload);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (uploadStatus.uploading) {
            setProgressVal(Math.max(progressVal + 0.1, 0.95));
        } else if (uploadStatus.uploadSuccess) {
            setProgressVal(1);
        } 
        
    }, [uploadStatus]);

    useEffect(() => {
        let subs = true;
        if (progressVal < 1 && progressVal !== 0) {
            setTimeout(() => {
                if (subs) {
                    setProgressVal(progressVal + 0.1);
                }
            }, 2000);
        }
        return () => {
            subs = false;
        };
    }, [progressVal]);

    // API getPosts
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        post.getListPost(null, user.token)
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
        like.actionLike(postId, user.token)
        .then(result => {
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

    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {
                    uploadStatus.uploading && <LinearProgress value={progressVal} color="white" trackColor="#2eb0fb"/> 
                }
                
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