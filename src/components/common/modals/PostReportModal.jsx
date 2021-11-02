import React, { useEffect, useState } from 'react';
import BottomHalfModal from './BottomHalfModal';
import { StyleSheet, View } from 'react-native';
import { Divider, Icon, ListItem, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Popup from './Popup';

const PostReportModal = ({ postId }) => {
    
    const dispatch = useDispatch();

    const options = [
        {
            title: 'Nội dung nhạy cảm',
        },
        {
            title: 'Làm phiền',
        },
        {
            title: 'Lừa đảo',
        },
        {
            title: 'Nhập lý do khác',
        },
    ]


    return (
        <Popup 
            isModalVisible={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Lý do báo xấu
                </Text>
                <Divider/>
                {
                    options.map((option, idx) => (
                        <ListItem
                            key={idx}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={styles.optionText}>
                                    {option.title}
                                </ListItem.Title>
                                <Divider/>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
                
            </View>
        </Popup>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 280, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    }, 
    title: {
        fontSize: 24, 
        marginLeft: 14, 
        marginBottom: 4,
        fontWeight: 'bold'
    },
    optionText: {
        fontSize: 18
    }
})

export default PostReportModal;