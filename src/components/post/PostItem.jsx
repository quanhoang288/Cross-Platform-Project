import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, View, Avatar, HStack, Stack, Text, IconButton, Icon, Image } from 'native-base';
import { Feather, AntDesign, FontAwesome5  } from '@expo/vector-icons'; 
// import { CarouselSwipe } from '../common';

const PostItem = props => {
    return (
        <Stack space={4}>
            <HStack flex="1" justifyContent="space-between" alignItems="flex-start" marginLeft={2}> 
                {/* Header  */}
                {/* Profile section  */}
                <HStack flex="3" space={2}>
                    <Avatar
                        bg="pink.600"
                        alignSelf="center"
                        source={{
                            uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                        }}
                    >
                        GG
                    </Avatar>
                    {/* Name and timeline section */}
                    <Box>
                        <Text fontSize="md" bold>Quan Hoang Quan HoangQuan HoangQuan HoangQuan HoangQuan HoangQuan HoangQuan HoangQuan HoangQuan HoangQuan Hoang</Text>
                        <Text fontSize="sm">2h</Text>
                    </Box>
                </HStack>
                <IconButton icon={<Icon as={Feather} name='more-horizontal'/>} style={{paddingTop: 0}}/>
            </HStack>
            <Stack space={2}>
                <Text marginLeft={2}>https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg</Text>

                {/* <CarouselSwipe/> */}

                <Image
                    source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                    }}    
                    alt="Post image"
                    size="2xl"
                    width="100%"
                />
            </Stack>
            <HStack flex="1" space={2}>
                <IconButton icon={<Icon as={AntDesign} name='hearto'/>}></IconButton>
                <IconButton icon={<Icon as={FontAwesome5} name='comment'/>}></IconButton>
            </HStack>
        </Stack>
    );
};

PostItem.propTypes = {
    
};

export default PostItem;