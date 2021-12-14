import React, { useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const CustomTabView = ({ routes }) => {
  const [index, setIndex] = useState(0);

  const scenes = {};
  routes.forEach((route) => (scenes[route.key] = route.component));

  const handleIndexChange = (index) => setIndex(index);

  const renderTabBarLabel = ({ route, focused, color }) => (
    <Text style={{ color, margin: 5, fontSize: 16 }}>{route.title}</Text>
  );

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
        renderLabel={renderTabBarLabel}
        activeColor='black'
        inactiveColor='grey'
      />
    );
  };

  const renderScene = SceneMap(scenes);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  indicatorStyle: {
    backgroundColor: "black",
  },
});

export default CustomTabView;
