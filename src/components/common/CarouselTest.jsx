import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView } from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const CarouselTest = (props) => {

    const [activeIndex, setActiveIndex] = React.useState(0);
    const carouselItems = [
        {
            title:"Item 1",
            text: "Text 1",
        },
        {
            title:"Item 2",
            text: "Text 2",
        },
        {
            title:"Item 3",
            text: "Text 3",
        },
        {
            title:"Item 4",
            text: "Text 4",
        },
        {
            title:"Item 5",
            text: "Text 5",
        },
    ];
 
    

    const _renderItem = ({item,index}) => {
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    
    return (
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel
                layout={"default"}
                // ref={ref => this.carousel = ref}
                data={carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem = { index => setActiveIndex(index) } />
            <Pagination
                 inactiveDotOpacity={0.4}
                 inactiveDotScale={0.6}
                 activeDotIndex={ activeIndex }
                 dotsLength={carouselItems.length}
                
             />
        </View>
        
    );
    
}

export default CarouselTest;

