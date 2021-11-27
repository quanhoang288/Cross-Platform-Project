import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { post } from '../../apis';
import { Toast } from '../../helpers';
import { successMessages } from '../../constants/message';
import { useDispatch } from 'react-redux';
import { uploadActions } from '../../redux/actions';
import { PostList } from '../../components/post';
import { useNavigation } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';


const NewsFeed = props => {
    const [progressVal, setProgressVal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const uploadStatus = useSelector(state => state.upload);
    const user = useSelector(state => state.auth.user);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    // API getPosts
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const latestPosts = await post.getListPost(null, user.token)
            setPosts(latestPosts.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // post.getListPost(null, user.token)
        // .then((result)=> {
        //     const curPosts = result.data.data;
        //     setPosts(curPosts);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        fetchPosts();
    },[]);

    useEffect(() => {
        if (!user) {
            navigation.navigate(stacks.signIn.name);
        }
    }, [user]);

    useEffect(() => {
        if (uploadStatus.uploading) {
            setProgressVal(Math.max(progressVal + 0.1, 0.99));
        } else if (uploadStatus.data) {
            const postData = uploadStatus.data;
            setProgressVal(0);
            if (posts.findIndex(post => post._id === postData._id) !== -1) {
                console.log('updating');
                Toast.showSucessMessage(successMessages.updatePostSuccess);
                setPosts(posts.map(post => post._id === postData._id ? postData : post));
            } else {
                console.log('appending');
                Toast.showSucessMessage(successMessages.createPostSuccess);
                setPosts([postData, ...posts]);
            }
         
            dispatch(uploadActions.resetState());            
        } else if (uploadStatus.err) {
            Toast.showFailureMessage(uploadStatus.err);
        }
        
    }, [uploadStatus]);

    useEffect(() => {
        if (progressVal < 1 && progressVal !== 0 && uploadStatus.uploading) {
            setTimeout(() => {
                setProgressVal(Math.max(progressVal + 0.1, 0.9));
            }, 1000);
        }
    }, [progressVal, uploadStatus]);

    useEffect(() => {
        const refresh = async () => {
            await fetchPosts();            
            setRefreshing(false);
        }
        if (refreshing) {
            refresh();
        }
    }, [refreshing]);

    const MyLoader = (props) => (
        <ContentLoader 
          speed={5}
          width={DEVICE_WIDTH}
          height={DEVICE_HEIGHT}
          viewBox={`0 0 ${DEVICE_WIDTH} ${DEVICE_HEIGHT}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
          <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
          <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
          <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
          <Rect x="0" y="88" rx="3" ry="3" width={DEVICE_WIDTH} height={DEVICE_WIDTH} /> 
          <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
    )

    const handleRefresh = () => {
        setRefreshing(true);
    }
       
    if (!user || posts.length === 0) {
        return (
            <MyLoader/>
        );
    }

    return (
        <View>
            { uploadStatus.uploading && <LinearProgress value={0.5} color="white" trackColor="#2eb0fb"/> }
            <PostList refreshing={refreshing} handleRefresh={handleRefresh} posts={posts}/>
        </View>
    );
};



NewsFeed.propTypes = {
    
};

export default NewsFeed;