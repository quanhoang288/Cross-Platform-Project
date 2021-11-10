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
            // tabBarIcon: ({ color, size }) => (
            //     <Icon type='entypo' name='home' color={color} size={size}/>
            // )
        }
    },
    {
        name: 'SearchStack',
        component: SearchStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Search',
            // tabBarIcon: ({ color, size }) => (
            //     <Icon type='fontawesome' name='search' color={color} size={size}/>
            // )
        }
    },
    {
        name: 'MessageStack',
        component: MessageStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Message',
            // tabBarIcon: ({ color, size }) => (
            //     <Icon type='antdesign' name='message1' color={color} size={size}/>
            // )
        }
    },
    {
        name: 'NotificationStack',
        component: NotificationStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Notification',
        }
    },
    {
        name: 'PersonalStack',
        component: PersonalStack,
        options: {
            headerShown: false,
            tabBarLabel: 'Profile',
        }
    },
    
]

const TabNavigator = props => {
    const routeToIconMappings = {
        PostStack: {
            type: 'entypo',
            name: 'home',
        }, 
        SearchStack: {
            type: 'fontawesome',
            name: 'search',
        },
        MessageStack: {
            type: 'antdesign',
            name: 'message1',
        },
        NotificationStack: {
            type: 'ionicon',
            name: 'notifications',
        }, 
        PersonalStack: {
            type: 'material-community',
            name: 'account',
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: 'blue',
                tabBarShowLabel: false,
                tabBarIcon: ({color, size}) => {
                    return <Icon type={routeToIconMappings[route.name].type} name={routeToIconMappings[route.name].name} size={28} color={color} />;
                },

            })}
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



