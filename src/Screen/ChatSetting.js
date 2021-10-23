import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Button,
  Image
} from 'react-native';
import {
  Avatar,
  FAB,
  Icon,
  ListItem,
  Text,
  Badge,
  Tab,
} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const ChatSetting = ({ navigation })  => {
    return(
        <View>
        <ScrollView style={styles.ScrollView}>
            <Avatar 
            style={styles.Avatar}
            rounded
            size={100}
            
            source={require('../../assets/avatar.jpg')} 
            />
            <ListItem>
                <Image source={require('../../assets/findicon.png')} rounded/>
                <ListItem.Title>Find Message</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/profileicon.jpg')} rounded/>
                <ListItem.Title>Profile</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Notification</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Nickname</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Group</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Report</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Block</ListItem.Title>
            </ListItem>
            <ListItem>
                <Image source={require('../../assets/notificationicon.png')} rounded/>
                <ListItem.Title>Delete</ListItem.Title>
            </ListItem>
        </ScrollView>
        </View>
    )
}
export default ChatSetting;
const styles = StyleSheet.create({
    Avatar:{
        
    },
    ScrollView:{
        flex: 1
    }
})