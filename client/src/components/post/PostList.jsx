import React from 'react';
import PostItem from './PostItem';
import { LazyFlatList } from '../common';

const PostList = ({
  posts,
  refreshing,
  handleRefresh,
  handleEndReached,
  isFetchingNextPage,
  header,
}) => {
  const renderItem = ({ item }) => <PostItem post={item} postList={posts} />;

  return (
    <LazyFlatList
      listHeader={header}
      data={posts}
      renderItem={renderItem}
      refreshing={refreshing}
      handleRefresh={handleRefresh}
      isFetchingNextPage={isFetchingNextPage}
      handleEndReached={handleEndReached}
    />
  );
};

PostList.propTypes = {};

export default PostList;
