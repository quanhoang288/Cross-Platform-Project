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
                <View>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                </View>
            </ScrollView>
            <View style={styles.commentSection}>
                <Icon type='feather' name='camera' size={28} />
                <Input placeholder="Enter your comment" multiline textAlignVertical='top' containerStyle={styles.commentInputContainer} inputStyle={{maxHeight: 60}}/>
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
        marginHorizontal: 6,
        alignItems: 'center',
        flexDirection: 'row',
    }, 
    commentInputContainer: {
        // maxWidth: DEVICE_WIDTH - 50
    }
    
})

Comment.propTypes = {
    
};

export default Comment;