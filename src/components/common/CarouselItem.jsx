import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const CarouselItem = ({ item, index }) => {
    return (
        <View key={index} style={styles.container}>
            <Image 
                source={{
                    uri: item.uri,
                }}
                alt="Image Alt"
                size="2xl"
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: ITEM_WIDTH,
    },
    image: {
        width: ITEM_WIDTH,
    }
})

export default CarouselItem;