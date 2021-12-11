import React, { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { StyleSheet, View } from "react-native";
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from "./CarouselItem";
import { ASSET_API_URL } from "../../configs";

const CarouselSwipe = ({ images }) => {
  const [activeTab, setActiveTab] = useState(0);

  const imageUris = images.map((image) => ({
    uri: `${ASSET_API_URL}/${image.fileName}`,
  }));

  return (
    <View style={{ marginBottom: 10 }}>
      <Carousel
        data={imageUris}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(i) => setActiveTab(i)}
        lockScrollWhileSnapping={true}
      />

      <Pagination
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        activeDotIndex={activeTab}
        dotsLength={imageUris.length}
        dotContainerStyle={{ marginBottom: -6 }}
      />
    </View>
  );
};

export default CarouselSwipe;
