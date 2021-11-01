import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Stack } from '../components/common';
import { MessageScreen } from '../screens/message';
import { stacks } from '../constants/title';


const screens = [
    {
<<<<<<< HEAD
        name: stacks.messageScreen.name,
        title: stacks.messageScreen.title,
        component: MessageScreen,
        options: {
            
        }
=======
        name: 'message',
        component: Message,
        options: {}
>>>>>>> 39f182c (add routing signIn/signUp)
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