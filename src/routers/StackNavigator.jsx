import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../constants/title';
import TabNavigator from './TabNavigator';
import { CreatePost, PostList, Comment } from '../screens/post';
import { Profile } from '../screens/account';
import { Button } from 'react-native-elements';
import { ChangePW, PersonalInformation } from '../screens/advance';
import { ListFriend } from '../screens/listFriend';
const Stack = createNativeStackNavigator();

const stackScreens = [
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
            headerRight: () => (
                <Button
                    onPress={() => {}}
                    title="Save"
                    color="#fff"
                    style={{marginRight: 10}}
              />
            )
        }
    }, 
    {
        name: stacks.newsFeed.name,
        component: PostList,
    }, 
    {
        name: stacks.comment.name,
        component: Comment,
    }, 
    {
        name: stacks.profile.name,
        component: Profile,
        options: {
            headerShown: false,
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

]

const StackNavigator = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgb(0, 102, 255)'
                },
                headerTintColor: '#fff',
                
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