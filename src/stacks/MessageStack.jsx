import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';

const Message = () => {
    return (
        <Text>Message</Text>
    );
}

const screens = [
    {
        name: 'messsage',
        component: Message,
        options: {}
    }
];

const MessageStack = props => { 
    return (
        <Message/>
        // <Stack screens={screens} />
    );
};

MessageStack.propTypes = {
    
};

export default MessageStack;