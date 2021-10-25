import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { PostList } from '../screens/post';
import { stacks } from '../constants/title';
import { PostListHeader, PostListHeaderRight } from '../components/headers/post';
const screens = [
    {
        name: stacks.newsFeed.name,
        component: PostList,
        options: {
            headerTitle: (props) => <PostListHeader {...props} />,
            headerRight: () => <PostListHeaderRight/>,
        }
    }
];

const PostStack = props => { 
    return (
        <Stack screens={screens} />
    );
};


PostStack.propTypes = {
    
};

export default PostStack;