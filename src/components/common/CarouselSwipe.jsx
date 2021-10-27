import React, { useRef, useState } from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { StyleSheet, View } from 'react-native';
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './CarouselItem';

const CarouselSwipe = props => {
    
    const [activeTab, setActiveTab] = useState(0);

    const items = [
        {uri: 'https://wallpaperaccess.com/full/317501.jpg'},
        {uri: 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
        {uri: 'https://wallpaperaccess.com/full/317501.jpg'},
        {uri: 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
    ];
    

    return (
        <View>
            <Carousel
                data={items}
                renderItem={CarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={i => setActiveTab(i)}
                lockScrollWhileSnapping={true}
            />
                            
            <Pagination
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={ activeTab }
                dotsLength={items.length}
                // dotContainerStyle={{marginVertical: 10}}
            />
            
        </View>
    );
};



export default CarouselSwipe;