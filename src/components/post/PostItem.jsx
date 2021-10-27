import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet } from 'react-native';
import { Avatar, Button, Icon, Image, Text } from 'react-native-elements'
import { CarouselSwipe, CarouselTest } from '../common';
import { useNavigation } from '@react-navigation/native';
import { stacks } from '../../constants/title';

const PostItem = ({author, content, handleShowMore}) => {
    const navigation = useNavigation();
   
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}> 
                <View style={styles.profileSection}>
                    <Avatar
                        rounded
                        source={{
                            uri: author.profileURI,
                        }}
                    />
                    <View style={styles.nameTimeLine}>
                        <Text style={{fontWeight: 'bold'}}>{author.name}</Text>
                        <Text>{content.timestamp}</Text>
                    </View>
                </View>
                <Icon 
                    type='feather' 
                    name='more-horizontal' 
                    size={32} 
                    iconStyle={{marginRight: 6}}
                    style={{marginRight: 6}} 
                    onPress={() => {}}
                />
            </View>

            <View style={styles.postContent}>
                <Text style={styles.textContent}> 
                    {content.textContent}
                </Text>
                {/* { content.imageURI && <Image
                    source={{
                        uri: content.imageURI,
                    }}    
                    alt="Post image"
                    style={{height: 256, maxHeight: 256, width: '100%'}}
                />
                } */}
                <CarouselSwipe/>
            </View>

            
            <View style={styles.iconGroup}>
                <View style={styles.icon}>
                    <Icon type='font-awesome' name='heart-o' size={28}/>
                    <Text style={styles.count}>{content.numLikes}</Text>
                </View>
                <View style={styles.icon}>
                    <Icon type='font-awesome' name='comment-o' size={28} onPress={() => navigation.navigate(stacks.comment.name)}/>
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
        flex: 1,
        // marginBottom: 4,
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
        marginBottom: 10,
    },
    icon: {
        marginRight: 20,
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