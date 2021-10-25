import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../constants/title';
import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import { CreatePost, PostList, Comment } from '../screens/post';
import { Profile } from '../screens/account';
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