import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Divider, Icon, Input } from 'react-native-elements';
import { CommentItem } from '../../components/post';
import { DEVICE_WIDTH } from '../../constants/dimensions';

const Comment = props => {

    const comments = [
        {
            author: {
                'name': 'Quan Hoang',
                'profileURI': '',
            },
            comment: {
                id: 'dasfasf',
                timestamp: '4h',
                
            }
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.commentList}>
                {/* <View> */}
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                {/* </View> */}
            </ScrollView>
            <View style={styles.commentSection}>
                <Icon 
                    type='feather' 
                    name='camera'
                    size={28}
                    containerStyle={{alignSelf: 'center'}} 
                    iconStyle={styles.cameraIcon}/>
                <Input 
                    placeholder="Enter your comment" 
                    multiline
                    inputContainerStyle={styles.commentInputContainer} 
                    numberOfLines={3}
                    rightIcon={<Icon name='send' type='ionicons' size={28} iconStyle={{color: 'blue', marginLeft: 6}}/>}
                    // inputStyle={{maxHeight: 60}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentList: {
        marginBottom: 6
    }, 
    commentSection: {
        marginBottom: 6,
        maxHeight: 50,
        flexDirection: 'row',
    }, 
    commentInputContainer: {
        borderRadius: 20,
        borderColor: 'rgba(110, 120, 170, 1)',
        borderWidth: 1,
        width: '90%',
        paddingLeft: 10,
    },
    cameraIcon: {
        marginLeft: 6, 
        alignSelf: 'center'
    }
    
})

Comment.propTypes = {
    
};

export default Comment;