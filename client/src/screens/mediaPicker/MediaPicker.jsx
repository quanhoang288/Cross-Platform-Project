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
import { useRoute } from '@react-navigation/native';

const Header = (props) => {
  const Item = Picker.Item;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}
    >
      <Icon
        name="close"
        type="antdesign"
        iconStyle={{
          marginLeft: 10,
        }}
        onPress={props.handleBack}
      />

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
          title="Next"
          containerStyle={{ marginRight: 20 }}
          style={{ marginRight: 20 }}
          onPress={props.handleBack}
        />
      ) : (
        <Icon
          type="antdesign"
          name="camera"
          size={28}
          iconStyle={{ marginRight: 20 }}
          onPress={props.handleLaunchCamera}
        />
      )}
    </View>
  );
};

const areEqual = (prevProps, nextProps) => {
  const { item, selectedAssets } = nextProps;
  const { item: prevItem, selectedAssets: prevSelectedAssets } = prevProps;

  if (item !== prevItem) {
    return false;
  }

  const selectedIndex = selectedAssets.findIndex(
    (asset) => asset.uri === item.uri,
  );
  const prevSelectedIndex = prevSelectedAssets.findIndex(
    (asset) => asset.uri === item.uri,
  );

  return selectedIndex === prevSelectedIndex;
};

const MediaItem = React.memo((props) => {
  const { selectedAssets, item, isSingleSelect, handleItemSelected } = props;

  const isInSelectedAssets = () => {
    return selectedAssets.filter((asset) => asset.uri === item.uri).length > 0;
  };

  const getIndexInSelectedAssets = () => {
    return selectedAssets.findIndex((asset) => asset.uri === item.uri);
  };

  const isSelected = isInSelectedAssets();

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
            backgroundColor: isInSelectedAssets()
              ? 'rgba(255,255,255,0.40);'
              : 'transparent',
          },
        ]}
      />

      <View
        style={[
          styles.selected,
          {
            backgroundColor: isSelected ? '#0275d8' : '#292b2c',
            borderColor: 'white',
            borderWidth: 2,
          },
        ]}
      >
        {isSingleSelect ? (
          isSelected && (
            <Icon
              type="font-awesome"
              name="check"
              color="white"
              iconStyle={styles.check}
              style={styles.check}
            />
          )
        ) : (
          <Text style={styles.text}>
            {isSelected ? getIndexInSelectedAssets() + 1 : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}, areEqual);

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
          handleItemSelected={props.handleItemSelected}
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

  useEffect(() => {
    console.log('selected: ', selectedAssets);
  }, [selectedAssets]);

  useEffect(() => {
    const fetchAlbumAssets = async (albumName) => {
      const albumAssets = await fetchAllAssetsInAlbum(albumName);
      setAlbumAssets(albumAssets);
    };
    fetchAlbumAssets(selectedAlbum);
  }, [selectedAlbum]);

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

  const handleBack = () => {
    if (route.params && route.params.handleBack) {
      route.params.handleBack();
    }
    navigation.pop();
  };
  const handleAlbumSelected = (album) => setSelectedAlbum(album);

  const handleItemSelected = (item) => {
    const isAlreadySelected =
      selectedAssets.findIndex((asset) => asset.uri === item.uri) >= 0;

    console.log(selectedAssets);

    if (isAlreadySelected) {
      console.log('removing asset');
      dispatch(mediaActions.removeAsset(item));
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
  };

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

  return (
    <View style={styles.container}>
      <Header
        albumNames={albumNames}
        selectedAssets={selectedAssets}
        selectedAlbum={selectedAlbum}
        handleBack={handleBack}
        handleAlbumSelected={handleAlbumSelected}
        handleLaunchCamera={handleLaunchCamera}
      />

      <Content
        albumAssets={albumAssets}
        selectedAssets={selectedAssets}
        handleItemSelected={handleItemSelected}
        isSingleSelect={isSingleSelect}
      />
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
    color: '#000',
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
