import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';

const Search = () => {
    return (
        <Text>Search</Text>
    );
}

const screens = [
    {
        name: 'messsage',
        component: Search,
        options: {}
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