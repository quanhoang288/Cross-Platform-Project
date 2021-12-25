import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../constants/title';
import TabNavigator from './TabNavigator';
import { CreatePost, Comment } from '../screens/post';
import { MediaPicker } from '../screens/mediaPicker';
import { Profile } from '../screens/account';
import { ChangePW, PersonalInformation } from '../screens/advance';
import {
  ListFriend,
  FriendRequest,
  FriendTabView,
} from '../screens/listFriend';
import {
  ChatScreen,
  MessageScreen,
  ChatSetting,
  NewMessage,
} from '../screens/message';
import { SignIn, SignUp } from '../screens/signIn-signUp';
import { CustomTabView } from '../components/common';

const Stack = createNativeStackNavigator();

const stackScreens = [
  {
    name: stacks.signIn.name,
    component: SignIn,
    options: {
      headerShown: false,
    },
  },
  {
    name: stacks.signUp.name,
    component: SignUp,
    options: {
      title: stacks.signUp.title,
    },
  },
  {
    name: 'Tabs',
    component: TabNavigator,
    options: {
      headerShown: false,
    },
  },
  {
    name: stacks.createPost.name,
    component: CreatePost,
  },

  {
    name: stacks.mediaPicker.name,
    component: MediaPicker,
    options: {
      headerShown: false,
    },
  },

  {
    name: stacks.comment.name,
    component: Comment,
  },
  {
    name: stacks.profile.name,
    component: Profile,
    options: {},
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
    name: stacks.friendRequest.name,
    options: {
      title: stacks.friendRequest.title,
    },
    component: FriendRequest,
  },

  {
    name: stacks.changePW.name,
    options: {
      title: stacks.changePW.title,
    },
    component: ChangePW,
  },

  {
    name: stacks.signOut.name,
    component: SignIn,
    options: {
      headerShown: false,
    },
  },

  {
    name: stacks.chatScreen.name,
    component: ChatScreen,
    // options: {
    //   title: stacks.chatScreen.title,
    // },
  },
  {
    name: stacks.messageScreen.name,
    component: MessageScreen,
  },
  {
    name: stacks.chatSetting.name,
    component: ChatSetting,
  },
  {
    name: stacks.friendTabs.name,
    component: FriendTabView,
    options: {
      title: stacks.friendTabs.title,
    },
  },
  {
    name: stacks.newMessage.name,
    component: NewMessage,
    options: {
      headerShown: false,
    },
  },
];

const StackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: 'rgb(0, 102, 255)'
          backgroundColor: '#fff',
        },
      }}
    >
      {stackScreens.map((screen, idx) => (
        <Stack.Screen
          key={idx}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
