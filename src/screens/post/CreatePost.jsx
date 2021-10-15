import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, TextArea, IconButton, Icon, HStack, Stack } from 'native-base';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'native-base';
const CreatePost = props => {
    const [postContent, setPostContent] = useState('');

    useEffect(() => {
        console.log(postContent);
    }, [postContent]);

    return (
        <Stack flex="1" justifyContent="space-between" space="2">        
            <TextArea 
                placeholder="What's in your mind?"
                value={postContent}
                onChangeText={(text) => setPostContent(text)}
                height="90%"

            />

            <HStack flex="1" justifyContent="space-between" style={{borderColor: "red"}}>
                <IconButton icon={<Icon as={Entypo} name='emoji-happy'/>} size="sm"></IconButton>
                <IconButton icon={<Icon as={MaterialIcons} name='image'/>} size="sm"></IconButton>
                <IconButton icon={<Icon as={MaterialIcons} name='video-collection'/>} size="sm"></IconButton>
               
            </HStack>

        </Stack>
    );
};

CreatePost.propTypes = {
    
};

export default CreatePost;