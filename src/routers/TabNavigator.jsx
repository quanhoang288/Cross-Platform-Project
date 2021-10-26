import React from 'react';
import { MessageStack, NotificationStack, PersonalStack, PostStack, SearchStack } from '../stacks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const tabScreens = [
    {
        name: 'PostStack',
        component: PostStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <Icon type='entypo' name='home' color={color} size={size}/>
            )
        }
    },
    {
        name: 'SearchStack',
        component: SearchStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
                <Icon type='fontawesome' name='search' color={color} size={size}/>
            )
        }
    },
    {
        name: 'MessageStack',
        component: MessageStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Message',
            tabBarIcon: ({ color, size }) => (
                <Icon type='antdesign' name='message1' color={color} size={size}/>
            )
        }
    },
    {
        name: 'NotificationStack',
        component: NotificationStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
                <Icon type='ionicon' name='notifications' color={color} size={size}/>
            )
        }
    },
    {
        name: 'PersonalStack',
        component: PersonalStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Icon type='material-community' name='account' color={color} size={size}/>
            )
        }
    },
    
]

const TabNavigator = props => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'blue',
            }}
        >
            {
                tabScreens.map((screen, idx) => (
                    <Tab.Screen 
                        key={idx} 
                        name={screen.name} 
                        component={screen.component} 
                        options={screen.options} 
                    />
                ))
            }
        </Tab.Navigator>
    );
};



export default TabNavigator;



