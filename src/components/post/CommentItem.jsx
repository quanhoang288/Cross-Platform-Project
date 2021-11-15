import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';

const CommentItem = ({comment}) => {
    return (
        <View style={styles.container}>
            <Avatar
                rounded
                source={{
                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                }}   
            />
            <View style={styles.commentContainer}>
                <Text style={{fontWeight: 'bold'}}>{comment.user.username}</Text>
                <Text>{comment.content}</Text>
                <Text>{comment.createdAt}</Text>
            </View>
            <Icon type='font-awesome' name='heart-o' size={28} iconStyle={{marginRight: 6}}/>
        </View>
    );
};

CommentItem.propTypes = {
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        marginBottom: 10,
        marginHorizontal: 6,
        backgroundColor: '#fff'
    }, 
    commentContainer: {
        flex: 2,
        borderRadius: 10,
        marginHorizontal: 6
    }

})

export default CommentItem;