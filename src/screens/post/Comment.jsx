import React from 'react';
import PropTypes from 'prop-types';
import { Stack, ScrollView, View, Input } from 'native-base';
import { CommentItem } from '../../components/post';

const Comment = props => {
    return (
        <Stack flex={1} justifyContent="space-between">
            <ScrollView showsVerticalScrollIndicator={false}>
            <Stack space={10} marginTop={4}>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>

            </Stack>
            </ScrollView>
            <Input size="md" placeholder="Enter your comment"/>
        </Stack>
    );
};

Comment.propTypes = {
    
};

export default Comment;