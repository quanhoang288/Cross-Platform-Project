import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { stacks } from '../constants/title';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>   
            <Button 
                title="Add new post" 
                containerStyle={styles.buttonContainer} 
                onPress={() => navigation.navigate(stacks.createPost.name)}
            />
            <Button 
                title="News Feed" 
                containerStyle={styles.buttonContainer} 
                onPress={() => navigation.navigate(stacks.newsFeed.name)}
            />
            <Button 
                title="Comment" 
                containerStyle={styles.buttonContainer} 
                onPress={() => navigation.navigate(stacks.comment.name)}
            />
            <Button 
                title="Profile" 
                containerStyle={styles.buttonContainer} 
                onPress={() => navigation.navigate(stacks.profile.name)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 40,
        width: 200,
        marginVertical: 20,
    }
})
Home.propTypes = {
    
};

export default Home;