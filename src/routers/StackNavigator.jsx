import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../constants/title';
import TabNavigator from './TabNavigator';
import { CreatePost, PostList, Comment } from '../screens/post';
import { Profile } from '../screens/account';
import { Button, Icon } from 'react-native-elements';
import { ChangePW, PersonalInformation } from '../screens/advance';
import { ListFriend } from '../screens/listFriend';
import { ChatScreen, MessageScreen } from '../screens/message';
import { SignIn, SignUp } from '../screens/signIn-signUp';

const Stack = createNativeStackNavigator();

const stackScreens = [
    {
        name: stacks.signIn.name,
        component: SignIn,
        options: {
            headerShown: false,
        }
    },
    
    {
        name: stacks.signUp.name,
        component: SignUp,
        options: {
            title: stacks.signUp.title,
        }
    },

    {
        name: 'Tabs',
        component: TabNavigator,
        options: {
            headerShown: false,
        }
    }, 
    {
        name: stacks.createPost.name,
        component: CreatePost,
        options: {
            title: stacks.createPost.title,
            headerRight: () => (
                <Button
                    onPress={() => {}}
                    title="Save"
                    color="#fff"
                    buttonStyle={{borderRadius: 10}}
                    style={{marginRight: 10}}
              />
            )
        }
    },  
    {
        name: stacks.comment.name,
        component: Comment,
    }, 
    {
        name: stacks.profile.name,
        component: Profile,
        options: {

        }
    }, 
    {
        name: stacks.personalInformation.name,
        options: {
            title: stacks.personalInformation.title,
        },
        component: PersonalInformation,
    }, 
    {
        name: stacks.listFriend.name,
        options: {
            title: stacks.listFriend.title,
        },
        component: ListFriend,
    }, 
    {
        name: stacks.changePW.name,
        options: {
            title: stacks.changePW.title,
        },
        component: ChangePW,
    }, 
    {
        name: stacks.chatScreen.name,
        component: ChatScreen,
        options:{
            title: stacks.chatScreen.title,
            headerRight: () => (
                <Icon 
                    type='feather' 
                    name='more-horizontal' 
                    size={32} 
                />
            ),
        }
    },
    {
        name: 'message',
        component: MessageScreen,
    }

]

const StackNavigator = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    // backgroundColor: 'rgb(0, 102, 255)'
                    backgroundColor: '#fff'
                },
                
            }}
        >
            {
                stackScreens.map((screen, idx) => (
                    <Stack.Screen 
                        key={idx} 
                        name={screen.name} 
                        component={screen.component} 
                        options={screen.options}
                    />
                ))
            }
        </Stack.Navigator>
    );
};



export default StackNavigator;