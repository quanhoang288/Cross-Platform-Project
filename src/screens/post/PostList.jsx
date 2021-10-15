import React from 'react';
import PropTypes from 'prop-types';
import { View, Stack, ScrollView } from 'native-base';
import { PostItem } from '../../components/post';
const PostList = props => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <Stack space={10} style={{marginTop: 10}}>
            <PostItem/>
            <PostItem/>
            <PostItem/>
            <PostItem/>
            <PostItem/>
            <PostItem/>
        </Stack>
        </ScrollView>
    );
};

PostList.propTypes = {
    
};

export default PostList;