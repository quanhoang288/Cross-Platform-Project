import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { MessageScreen } from '../screens/message';
import { stacks } from '../constants/title';


const screens = [
    {
        name: stacks.messageScreen.name,
        component: MessageScreen,
        options: {
            title: stacks.messageScreen.title,
        }
    }
];

const MessageStack = props => { 
    return (
        
        <Stack screens={screens} />
    );
};

MessageStack.propTypes = {
    
};

export default MessageStack;