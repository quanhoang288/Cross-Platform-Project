import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Input, Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { style } from 'styled-system';
import { DEVICE_HEIGHT } from '../../constants/dimensions';

const CreatePost = props => {
    const [postContent, setPostContent] = useState('');

    return (
        <View style={styles.container}>      
            <Input
                placeholder="What's in your mind?"
                value={postContent}
                onChangeText={text => setPostContent(text)}
                containerStyle={styles.inputOutterWrapper}
                inputContainerStyle={styles.inputInnerWrapper}
                inputStyle={styles.inputText}
                multiline
                numberOfLines={25}
            />

            <View style={styles.buttonGroup}>
                <Icon type='entypo' name='emoji-happy' size={32}/>
                <Icon type='material' name='image' size={32} />
                <Icon type='material' name='video-collection' size={32}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 4
    },
    inputOutterWrapper: {
        flex: 4,
        marginBottom: 2,
        width: "100%",
    },
    inputInnerWrapper: {
        flex: 1,
    },
    inputText: {
        height: '95%',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 2
    }
})

CreatePost.propTypes = {
    
};

export default CreatePost;