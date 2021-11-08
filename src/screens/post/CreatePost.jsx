import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Input, Icon, Image } from 'react-native-elements';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { marginRight, style } from 'styled-system';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';
import { post } from '../../apis'


const CreatePost = props => {
    const [postContent, setPostContent] = useState('');
    const [mediaCollection, setMediaCollection] = useState([
        {
            id: 1,
            type: 'image',
            uri:'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/33717445_2017235158593393_2828700460834095104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=0debeb&_nc_ohc=891Bj3nBfNAAX-ioJN5&tn=wmNj442-khagyQph&_nc_ht=scontent.fhan5-2.fna&oh=721f9bc5884f8fd045ee9060929dad82&oe=61914F23',
        },
        {
            id: 2,
            type: 'image',
            uri:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/150285232_2678444575800087_1595654179302721413_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=-wYNWJJOPmIAX8z4lLc&_nc_ht=scontent.fhan5-4.fna&oh=c5b6b4faf3e24f33b673b7a46bfa78e1&oe=619257B2', 
        },
        {
            id: 3,
            type: 'image',
            uri:'https://i.pinimg.com/236x/56/b6/f5/56b6f5fb5c9953347d4d8226da81521e--lookbook-app.jpg',     
        }, 
        {
            id: 4,
            type: 'image',
            uri:'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/244531855_385626303281134_1187721163336951525_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3QDch7qV0IUAX80KJJs&_nc_ht=scontent.fhan5-2.fna&oh=8ed2031797b605a4bb5a926fbcaf4a63&oe=619133E4',
        }
    ]);

    // token = constant
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmdueCIsImlkIjoiNjE4MTA5NDk2YmRjYzkyZGIwNDU1MDEyIiwiaWF0IjoxNjM2Mzc3ODgyfQ.PERJlxqWua9oaUhed9pywKdrKc-lyVwWCnLitQtvPjY"

    const [data, setData] = useState({described: ""});
    const [isLoading, setLoading] = useState(true);

    const handleTextChange = (name, val) => {
        setData({
            ...data,
            [name]: val,
        })
    }

    const handleSubmit = () => {post.addPost(data.described, token)};



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
                handleTextChange={handleTextChange}
            />

            <View style={styles.mediaContainer}>
                {mediaCollection.length > 0 && mediaCollection.map(item => 
                    <ImageBackground 
                        source={{uri: item.uri}}
                        style={styles.media}
                        key={item.id}
                    >
                        <Icon 
                            name='close' 
                            type='ant-design' 
                            size={16} 
                            iconStyle={styles.removeIcon}
                            onPress={() => setMediaCollection(mediaCollection.filter(candidate => candidate.id !== item.id))}
                        />
                    </ImageBackground>
                )}
                
            </View>
            
            {/* <Divider/> */}

            <View style={styles.buttonGroup}>
                <Icon type='entypo' name='emoji-happy' size={32}/>
                <View style={styles.mediaButtonGroup}>
                    <Icon type='material' name='image' size={32} style={{marginRight: 20}} />
                    <Icon type='material' name='video-collection' size={32}/>
                </View>
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
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 4,
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