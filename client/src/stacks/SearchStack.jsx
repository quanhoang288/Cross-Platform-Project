import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { SearchFriend } from '../screens/search';
import { stacks } from '../constants/title';
import { SafeAreaView } from 'react-native';

const screens = [
    {
        name: stacks.searchFriend.name,
        component: SearchFriend,
        options: {
            headerShown: false,
        }
    }
];

const SearchStack = props => { 
    return (
        <Stack screens={screens} />
    );
};


SearchStack.propTypes = {
    
};

export default SearchStack;