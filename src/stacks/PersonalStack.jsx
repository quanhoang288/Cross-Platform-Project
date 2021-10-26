import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { Profile } from '../screens/account';
import { MenuAdvance } from '../screens/advance';

const screens = [
    {
        name: 'Personal Setting',
        component: MenuAdvance,
        options: {
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