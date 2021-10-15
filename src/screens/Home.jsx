import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from 'native-base';
import { View } from 'react-native';
import { stacks } from '../constants/title';

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            
            <Button onPress={() => navigation.navigate(stacks.createPost.name)}>Add new post</Button>
            <Button onPress={() => navigation.navigate(stacks.newsFeed.name)}>News Feed</Button>
            <Button onPress={() => navigation.navigate(stacks.comment.name)}>Comment</Button>
            <Button onPress={() => navigation.navigate(stacks.profile.name)}>Profile</Button>


        </View>
    );
};

Home.propTypes = {
    
};

export default Home;