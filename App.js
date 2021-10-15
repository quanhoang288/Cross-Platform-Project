import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InputText, FunctionalityItem } from './src/components/block';
import { registerRootComponent } from 'expo'; 
import { NativeBaseProvider, Box, Input, Avatar, TextArea, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import { CreatePost, PostList, Comment } from './src/screens/post';
import { Profile } from './src/screens/account';
import { stacks } from './src/constants/title';
const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name={stacks.home.name} component={Home} options={{ title: stacks.home.title, headerRight: () => (<Button style={{marginRight: 10}} color="#fff">Info</Button>)  }} />
          <Stack.Screen name={stacks.createPost.name} component={CreatePost} options={{ title: stacks.createPost.title, headerRight: () => (<Button style={{marginRight: 10}} color="#fff">Post</Button>) }} />
          <Stack.Screen name={stacks.newsFeed.name} component={PostList} options={{ title: stacks.newsFeed.title }}/>
          <Stack.Screen name={stacks.comment.name} component={Comment} options={{ title: stacks.comment.title }}/>
          <Stack.Screen name={stacks.profile.name} component={Profile} options={{ title: stacks.profile.title }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
  },
  input: {
    height: 40,
    width: "60%",
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
