import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider, HStack, Image, Icon, IconButton, Stack, Text, VStack, ZStack, ScrollView } from 'native-base';
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { PostList } from '../post';
const Profile = props => {
    return (
		<ScrollView showsHorizontalScrollIndicator={false}>
        <Stack>
            <Image 
                source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="Alternate Text"
                size="2xl"
                width="100%"
            >
            </Image>
            <Box position="relative" style={{alignItems: "center", marginBottom: 10}}>
                <Box style={{marginTop: -50, width: "fit-content"}}>
                <TouchableWithoutFeedback onPress={() => {console.log('pressed')}}>
                    <Avatar
                        source={{
                            uri: "https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg",
                        }}
                        alignSelf="center"
                        size="xl"
                    >
                        Profile
                    </Avatar>
                </TouchableWithoutFeedback>         
                </Box>
            </Box>
            <Text bold style={{textAlign: "center", fontSize: 24}}> Quân Hoàng </Text>
            <HStack marginX="4" marginTop="4" justifyContent="center" space="2">
				<Button backgroundColor="blue.400" leftIcon={<Icon as={Ionicons} name="person-add" size="sm" />} height="10" >Add friend</Button>
				<Button backgroundColor="blue.400" leftIcon={<Icon as={AntDesign} name="message1" size="sm" />} height="10" >Message</Button>
                <Button backgroundColor="gray.400" leftIcon={<Icon as={Feather} name='more-horizontal'/>} height="10" />
			</HStack>
			<Divider my="4" color="gray.400" />

			<TouchableOpacity activeOpacity="0.5" onPress={() => console.log('Friend list to be implemented')}>
				<HStack space="4" marginX="4" >
					<Icon as={FontAwesome5} name="user-friends" size="sm"></Icon>
					<Text>Friends (177)</Text>
				</HStack>
			</TouchableOpacity>
			<Divider my="4" color="gray.400" />

			<PostList/>
        </Stack>
		</ScrollView>
    );
};

Profile.propTypes = {
    
};

export default Profile;