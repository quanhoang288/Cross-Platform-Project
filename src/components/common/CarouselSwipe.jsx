import React, {useEffect, useRef, useState} from 'react';
import CarouselComp, {Pagination} from 'react-native-snap-carousel';
import { Center, View } from 'native-base';
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './CarouselItem';
import { StyleSheet } from 'react-native';

const CarouselSwipe = props => {
    
    const isCarousel = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    // useEffect(() => {
    //     console.log(activeTab);
    // }, [activeTab])

    const items = [
        {'uri': 'https://wallpaperaccess.com/full/317501.jpg'},
        {'uri': 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
        {'uri': 'https://wallpaperaccess.com/full/317501.jpg'},
        {'uri': 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
        {'uri': 'https://wallpaperaccess.com/full/317501.jpg'},
        {'uri': 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
        {'uri': 'https://wallpaperaccess.com/full/317501.jpg'},
        {'uri': 'https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg'},
    ];
    
    return (
        <View>
            <CarouselComp
                data={items}
                ref={isCarousel}
                renderItem={CarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={ i => setActiveTab(i) }
                // inactiveSlideOpacity={ 1 }
                // inactiveSlideScale={ 1 }
                lockScrollWhileSnapping={true}
              
            />
            <View>                
                <Pagination
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    activeDotIndex={ activeTab }
                    dotsLength={4}
                    
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    ww:{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8, backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    container: {
      flex: 1,
      paddingTop: 40
    },
    tabBar : {
      position : 'absolute',
      right : 0,
      bottom : 0,
      left : 0,
      borderTopWidth : 1,
      borderColor : '#ddd',
      backgroundColor : '#fff'
    },
    tabsContainer : {
      flexDirection : 'row',
      height : 50,
      paddingTop : 0,
      paddingBottom : 0
    }
  })

export default CarouselSwipe;