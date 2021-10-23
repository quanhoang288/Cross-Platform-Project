import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';

const Personal = () => {
    return (
        <Text>Personal</Text>
    );
}

const screens = [
    {
        name: 'messsage',
        component: Personal,
        options: {}
    }
];

const PersonalStack = props => { 
    return (
        <Stack screens={screens} />
    );
};


PersonalStack.propTypes = {
    
};

export default PersonalStack;