import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

const LazyFlatList = ({
  data,
  refreshing,
  renderItem,
  handleRefresh,
  handleEndReached,
  isFetchingNextPage,
  listStyle,
  listHeader,
}) => {
  const renderFooter = () => {
    return isFetchingNextPage ? (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large" color="rgba(0,0,0,0.3)" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      ListHeaderComponent={listHeader}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.01}
      ListFooterComponent={renderFooter}
      style={listStyle}
    />
  );
};

export default LazyFlatList;
