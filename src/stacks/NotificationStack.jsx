import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';

const Notification = () => {
    return (
        <Text>Notification</Text>
    );
}

const screens = [
    {
        name: 'notification',
        component: Notification,
        options: {}
    }
];

const NotificationStack = props => { 
    return (
        <Stack screens={screens} />
    );
};

NotificationStack.propTypes = {
    
};

export default NotificationStack;