import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { Profile } from '../screens/account';

const screens = [
    {
        name: 'profile',
        component: Profile,
        options: {
            headerShown: false,
        }
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