import React from 'react';
import PropTypes from 'prop-types';
import { Container, View, Avatar, HStack, Stack, Text, IconButton, Icon, Image } from 'native-base';
import { Feather, AntDesign, FontAwesome5  } from '@expo/vector-icons'; 

const CommentItem = props => {
    return (
        <HStack flex="1" justifyContent="space-between">
            <Avatar
                bg="pink.600"
                source={{
                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                }}
                marginX={2}
            >
                Profile
            </Avatar>
            <Stack space={2} flex={2} borderRadius={10}>
                <Text fontSize="md" bold>Quan Hoang</Text>
                <Text>This is post comment This is post comment This is post comment This is post comment </Text>
                <Text fontSize="sm">2h</Text>
            </Stack>
            <IconButton icon={<Icon as={AntDesign} name='hearto'/>} paddingTop={0}/>

        </HStack>
    );
};

CommentItem.propTypes = {
    
};

export default CommentItem;