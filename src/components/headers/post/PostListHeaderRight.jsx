import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { stacks } from '../../../constants/title';
import { Icon } from 'react-native-elements';

const PostListHeaderRight = props => {
    const navigation = useNavigation();

    return (
        <Icon 
            type='font-awesome' 
            name='plus-square-o' 
            size={36} 
            style={{marginRight: 10}}
            onPress={() => navigation.navigate(stacks.createPost.name)}
        />
    )
};


export default PostListHeaderRight;