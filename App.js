import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import Home from './src/screens/Home';
import { CreatePost, PostList, Comment } from './src/screens/post';
import { Profile } from './src/screens/account';
import { stacks } from './src/constants/title';
const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name={stacks.home.name} component={Home} options={{ title: stacks.home.title  }} />
          <Stack.Screen name={stacks.createPost.name} component={CreatePost} options={{ title: stacks.createPost.title, headerRight: () => (<Button title="Post" style={{marginRight: 10, width: 64, color:"#fff"}}/>) }} />
          <Stack.Screen name={stacks.newsFeed.name} component={PostList} options={{ title: stacks.newsFeed.title }}/>
          <Stack.Screen name={stacks.comment.name} component={Comment} options={{ title: stacks.comment.title }}/>
          <Stack.Screen name={stacks.profile.name} component={Profile} options={{ title: stacks.profile.title }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
