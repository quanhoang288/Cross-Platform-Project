import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import {Notification} from '../screens/notification';


const screens = [
    {
        name: 'Notification',
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