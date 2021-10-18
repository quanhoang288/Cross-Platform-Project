import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Image, Text } from 'react-native-elements'
// import { CarouselSwipe } from '../common';

import { DEVICE_WIDTH } from '../../constants/dimensions';
import { fontSize } from 'styled-system';


const PostItem = ({author, content}) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}> 
                {/* Header  */}
                {/* Profile section  */}
                <View style={styles.profileSection}>
                    <Avatar
                        rounded
                        source={{
                            uri: author.profileURI,
                        }}
                    />
                    {/* Name and timeline section */}
                    <View style={styles.nameTimeLine}>
                        <Text style={{fontWeight: 'bold'}}>{author.name}</Text>
                        <Text>{content.timestamp}</Text>
                    </View>
                </View>
                <Icon type='feather' name='more-horizontal' size={32} style={{marginRight: 6}} />
            </View>

            <View style={styles.postContent}>
                <Text style={styles.textContent}> 
                    {content.textContent}
                </Text>
                { content.imageURI && <Image
                    source={{
                        uri: content.imageURI,
                    }}    
                    alt="Post image"
                    style={{height: 256, maxHeight: 256, width: '100%'}}
                />
                }
            </View>

            <View style={styles.iconGroup}>
                <View style={styles.icon}>
                    <Icon type='font-awesome' name='heart-o' size={28}/>
                    <Text style={styles.count}>{content.numLikes}</Text>
                </View>
                <View style={styles.icon}>
                    <Icon type='font-awesome' name='comment-o' size={28}/>
                    <Text style={styles.count}>{content.numComments}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        marginLeft: 6,
        marginBottom: 10,
        paddingTop: 6,
        alignItems: 'flex-start',
    },
    profileSection: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameTimeLine: {
        marginLeft: 6,
    },
    postContent: {
        marginBottom: 4,
    },
    textContent: {
        marginHorizontal: 6,
        marginBottom: 10,
    },
    iconGroup: {
        marginLeft: 6,
        // width: "40%",
        // justifyContent: "space-between",
        flexDirection: 'row',
        marginVertical: 4,
    },
    icon: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    count: {
        marginLeft: 4
    }
});

PostItem.propTypes = {
    
};

export default PostItem;