import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Input, Icon, Image } from 'react-native-elements';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { marginRight, style } from 'styled-system';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';
import { post } from '../../apis'
import { useNavigation, useRoute } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import { ImageHelper } from '../../helpers';
import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { useDispatch } from 'react-redux';
import { mediaActions, uploadActions } from '../../redux/actions';


const CreatePost = ({ navigation }) => {

    const [postContent, setPostContent] = useState('');
    const selectedAssets = useSelector(state => state.media.selectedAssets);
    const dispatch = useDispatch();
    

    // token = constant
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmdueCIsImlkIjoiNjE4MTA5NDk2YmRjYzkyZGIwNDU1MDEyIiwiaWF0IjoxNjM2Mzc3ODgyfQ.PERJlxqWua9oaUhed9pywKdrKc-lyVwWCnLitQtvPjY";



    useEffect(() => {
        navigation.setOptions({ 
            title: stacks.createPost.title,
            headerRight: () => (
                <Button
                    onPress={handleSave}
                    title="Save"
                    color="#fff"
                    buttonStyle={{borderRadius: 10}}
                    disabled={postContent.length === 0}
                    style={{marginRight: 10}}
                />
            )
        });
    }, [navigation, postContent, selectedAssets]);

    

    const convertToBase64 = async (assets) => {
        const mimeTypes = assets.map(asset => {
            const fileName = asset.filename;
            const mediaType = asset.mediaType === 'photo' ? 'image' : 'video';
            let extension = fileName.split('.')[1];
            if (extension === 'jpg') {
                extension = 'jpeg';
            }

            return `${mediaType}/${extension}`;
        });

        const assetPromises = assets.map(asset => FileSystem.readAsStringAsync(asset.uri, { encoding: FileSystem.EncodingType.Base64 }));
        const convertedAssets = await Promise.all(assetPromises);

        const base64Assets = convertedAssets.map((asset, idx) => formatIntoBase64String(asset, mimeTypes[idx]));
        return base64Assets;
    }

    const formatIntoBase64String = (data, mediaType) => {
        return `data:${mediaType};base64,${data}`;
    }


    const handleMediaButtonPressed = async () => {
        const mediaLibraryPermission = await ImageHelper.askMediaLibraryPermission();

        if (mediaLibraryPermission) {
            navigation.navigate(stacks.mediaPicker.name);
        }

    }


    const handleSave = async () => {
      
        dispatch(uploadActions.uploading());
        navigation.navigate(stacks.newsFeed.name);

        const imageAssets = selectedAssets.filter(asset => asset.mediaType === 'photo');
        const videoAssets = selectedAssets.filter(asset => asset.mediaType === 'video');
        
        const convertedImageAssets = await convertToBase64(imageAssets);
        const convertedVideoAssets = await convertToBase64(videoAssets);

       
        const postData = {
            described: postContent,
            images: convertedImageAssets,
            videos: convertedVideoAssets
        };
        try {
            
            const createResult = await post.addPost(postData, token);
            dispatch(mediaActions.resetState());
            dispatch(uploadActions.uploadSuccess());
        } catch (err) {
            dispatch(uploadActions.uploadFailure('Error occured!'));
            if (err.repsonse) {
                console.log(err.response);
            }
            console.log(err);
        }
    }

    


    const handleRemoveAsset = (asset) => {
        dispatch(mediaActions.removeAsset(asset));
    }


    return (
        <View style={styles.container}>      
            <Input
                placeholder="What's in your mind?"
                value={postContent}
                onChangeText={text => setPostContent(text)}
                containerStyle={styles.inputOutterWrapper}
                inputStyle={styles.inputText}
                multiline
                numberOfLines={25}
                underlineColorAndroid='transparent'
            />

            <View style={styles.mediaContainer}>
                {selectedAssets.length > 0 && selectedAssets.map(asset => 
                    <ImageBackground 
                        source={{uri: asset.uri}}
                        style={styles.media}
                        key={asset.id}
                    >
                        <Icon 
                            name='close' 
                            type='ant-design' 
                            size={16} 
                            iconStyle={styles.removeIcon}
                            onPress={() => handleRemoveAsset(asset)}
                        />
                    </ImageBackground>
                )}
                
            </View>
            

            <View style={styles.buttonGroup}>
                <Icon type='entypo' name='emoji-happy' size={32}/>
                <Icon type='material' name='image' size={32} iconStyle={{marginHorizontal: 20}} onPress={handleMediaButtonPressed} />

                {/* <View style={styles.mediaButtonGroup}>
                    <Icon type='material' name='image' size={32} style={{marginRight: 20}} onPress={handleMediaButtonPressed} />
                </View> */}
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
    },
    inputText: {
        paddingTop: 10,
        textAlignVertical: 'top',
        textAlign: 'left',
    },
    mediaContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    media: {
        width: 90,
        height: 100,
    },
    mediaButtonGroup: {
        flexDirection: 'row',
        marginRight: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        // justifyContent: "space-between",
        marginBottom: 10,
        // marginBottom: 4,
        marginLeft: 20,
    }, 
    removeIcon: {
        backgroundColor: '#fff', 
        borderRadius: 10, 
        alignSelf: 'flex-end'
    }
})

CreatePost.propTypes = {
    
};

export default CreatePost;