import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LazyFlatList from './LazyFlatList';
import { useSelector, useDispatch } from 'react-redux';
import { common } from '../../apis';
import { refreshActions } from '../../redux/actions';

const PullToRefresh = ({ refreshUrl, renderItem }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [isFetchingNextPage, setFetchingNextPage] = useState(false);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.auth.user.token);
  const refreshState = useSelector((state) => state.refresh);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await common.refresh(refreshUrl, token);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialize = async () => {
    dispatch(refreshActions.initStart());
    await fetchData();
    dispatch(refreshActions.initFinished());
  };

  const handleEndReached = () => {
    setFetchingNextPage(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const fetchNextPage = () => {
    console.log('Fetching next page...');
    const start = Date.now();
    common
      .fetchNextPage(refreshUrl, token, curPage + 1)
      .then((nextPage) => {
        const newData = nextPage.data.data;
        if (newData.length > 0) {
          setData(data.concat(newPosts));
          setCurPage(curPage + 1);
        }
        setFetchingNextPage(false);
        console.log(`Finished in ${Date.now() - start}s`);
      })
      .catch((err) => console.log(err));
  };

  const refresh = async () => {
    await fetchData();
    setRefreshing(false);
    setCurPage(1);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (refreshing) {
      refresh();
    }
  }, [refreshing]);

  useEffect(() => {
    if (refreshState.isRefreshing) {
      setRefreshing(true);
    }
    if (refreshState.isFetchingMore) {
      setFetchingNextPage(true);
    }
  }, [refreshState]);

  return (
    <View>
      <LazyFlatList
        data={data}
        refreshing={refreshing}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={renderItem}
        handleRefresh={handleRefresh}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

export default PullToRefresh;
