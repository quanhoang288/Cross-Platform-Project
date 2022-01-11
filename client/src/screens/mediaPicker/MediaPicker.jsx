import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, Image, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { mediaActions } from '../../redux/actions';
import { mediaReducer } from '../../redux/reducers';
import { ImageHelper, Toast } from '../../helpers';
import { useSelector } from 'react-redux';
import { DEVICE_WIDTH } from '../../constants/dimensions';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import * as FileSystem from 'expo-file-system';

const Header = (props) => {
  const Item = Picker.Item;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCancel = () => {
    dispatch(mediaActions.resetState());
    navigation.pop();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <View style={{ paddingLeft: 10, paddingRight: 30 }}>
        <Icon name="close" type="antdesign" onPress={handleCancel} />
      </View>

      <View style={{ width: 200 }}>
        <Picker
          mode="dropdown"
          selectedValue={props.selectedAlbum}
          onValueChange={props.handleAlbumSelected}
          style={{ marginRight: 40 }}
        >
          {props.albumNames.map((album, idx) => {
            return <Item key={idx} label={album} value={album} />;
          })}
        </Picker>
      </View>

      {props.selectedAssets.length > 0 ? (
        <Button
          title={props.headerRightTitle}
          containerStyle={{ marginLeft: 10, width: 75 }}
          onPress={props.handleNext}
        />
      ) : (
        <View style={{ marginLeft: 50 }}>
          <Icon
            type="antdesign"
            name="camera"
            size={32}
            onPress={props.handleLaunchCamera}
          />
        </View>
      )}
    </View>
  );
};

const MediaItem = (props) => {
  const dispatch = useDispatch();
  const selectedAssets = useSelector((state) => state.media.selectedAssets);
  const { item, isSingleSelect } = props;

  const getFileSize = async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.size;
  };

  const handleItemSelected = useCallback(
    async (item) => {
      const isAlreadySelected =
        selectedAssets.findIndex((asset) => asset.uri == item.uri) >= 0;

      if (isAlreadySelected) {
        dispatch(mediaActions.removeAsset(item));
        return;
      }

      const fileSize = await getFileSize(item.uri);
      if (item.mediaType == 'photo' && fileSize > 4000000) {
        Toast.showFailureMessage('Image size must not exceed 4MB');
        return;
      }
      if (item.mediaType == 'video' && fileSize > 10000000) {
        Toast.showFailureMessage('Video size must not exceed 10MB');
        return;
      }

      if (isSingleSelect) {
        if (selectedAssets.length == 0 && item.mediaType == 'video') {
          Toast.showFailureMessage('You can select image only');
          return;
        } else if (selectedAssets.length == 1) {
          Toast.showFailureMessage('You can select 1 image only');
          return;
        }
      } else if (
        selectedAssets.length == 1 &&
        selectedAssets[0].mediaType == 'video'
      ) {
        Toast.showFailureMessage('You can select 1 video only');
        return;
      } else if (selectedAssets.length == 4) {
        Toast.showFailureMessage('You can select up to 4 images only');
        return;
      }

      dispatch(mediaActions.addAsset(item));
    },
    [selectedAssets],
  );

  const getIndexInSelectedAssets = useCallback(() => {
    return selectedAssets.findIndex((asset) => asset.uri === item.uri);
  }, [selectedAssets]);

  return (
    <TouchableOpacity
      style={{ position: 'relative' }}
      onPress={() => handleItemSelected(item)}
    >
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.image}
      />

      <View
        style={[
          styles.selectedImage,
          {
            backgroundColor:
              getIndexInSelectedAssets() > -1
                ? 'rgba(255,255,255,0.40);'
                : 'transparent',
          },
        ]}
      />

      <View
        style={[
          styles.selected,
          {
            backgroundColor:
              getIndexInSelectedAssets() > -1 ? '#0275d8' : '#292b2c',
            borderColor: 'white',
            borderWidth: 2,
          },
        ]}
      >
        {isSingleSelect ? (
          getIndexInSelectedAssets() > -1 && (
            <Icon
              type="font-awesome"
              name="check"
              color="white"
              iconStyle={styles.check}
              size={16}
              style={styles.check}
              containerStyle={{ marginBottom: 2 }}
            />
          )
        ) : (
          <Text style={styles.text}>
            {getIndexInSelectedAssets() > -1
              ? getIndexInSelectedAssets() + 1
              : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Content = (props) => {
  return (
    <FlatList
      columnWrapperStyle={{
        flexWrap: 'wrap',
        width: '100%',
      }}
      data={props.albumAssets}
      renderItem={({ item }) => (
        <MediaItem
          item={item}
          selectedAssets={props.selectedAssets}
          // handleItemSelected={props.handleItemSelected}
          isSingleSelect={props.isSingleSelect}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

const MediaPicker = ({ navigation }) => {
  const albumNames = ['Camera', 'Screenshots', 'Messenger', 'Zalo', 'Facebook'];
  const dispatch = useDispatch();
  const route = useRoute();

  const [selectedAlbum, setSelectedAlbum] = useState(albumNames[0]);
  const [albumAssets, setAlbumAssets] = useState([]);

  const isSingleSelect = (route.params && route.params.isSingleSelect) || false;

  const selectedAssets = useSelector((state) => state.media.selectedAssets);

  const fetchAllAssetsInAlbum = async (albumName) => {
    let albumAssets = [];

    try {
      const album = await ImageHelper.getAlbum(albumName);
      albumAssets = await ImageHelper.getAssetsInAlbum(album);
    } catch (err) {
      console.log(err);
    }
    return albumAssets.assets;
  };

  const handleNext = () => {
    if (route.params && route.params.callback) {
      route.params.callback();
    }
    navigation.pop();
  };
  const handleAlbumSelected = (album) => setSelectedAlbum(album);

  const handleLaunchCamera = async () => {
    const result = await ImageHelper.launchCamera();
    if (!result.cancelled) {
      console.log(result.uri);
      dispatch(
        mediaActions.addAsset({
          uri: result.uri,
        }),
      );
    }
  };

  useEffect(() => {
    const fetchAlbumAssets = async (albumName) => {
      const albumAssets = await fetchAllAssetsInAlbum(albumName);
      setAlbumAssets(albumAssets);
    };
    fetchAlbumAssets(selectedAlbum);
  }, [selectedAlbum]);

  return (
    <View style={styles.container}>
      <Header
        albumNames={albumNames}
        selectedAssets={selectedAssets}
        selectedAlbum={selectedAlbum}
        handleNext={handleNext}
        handleAlbumSelected={handleAlbumSelected}
        handleLaunchCamera={handleLaunchCamera}
        headerRightTitle={route.params?.headerRightTitle || 'Next'}
      />

      <Content albumAssets={albumAssets} isSingleSelect={isSingleSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
  },
  image: {
    width: DEVICE_WIDTH / 3,
    height: DEVICE_WIDTH / 3,
    resizeMode: 'cover',
    // marginRight: 2,
  },
  selectedImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  check: {
    color: 'rgb(230,230,230)',
  },
  selected: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MediaPicker.propTypes = {};

export default MediaPicker;
