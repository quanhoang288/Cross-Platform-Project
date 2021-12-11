import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Button, Divider, Input, Icon, Image } from "react-native-elements";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/dimensions";
import { post } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/core";
import { stacks } from "../../constants/title";
import { ImageHelper } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { mediaActions, uploadActions } from "../../redux/actions";
import * as ImageManipulator from "expo-image-manipulator";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const selectedAssets = useSelector((state) => state.media.selectedAssets);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!user) {
      navigation.navigate(stacks.signIn.name);
    }
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params ? route.params.title : stacks.createPost.title,
      headerRight: () => (
        <Button
          onPress={handleSave}
          title='Save'
          color='#fff'
          buttonStyle={{ borderRadius: 10 }}
          disabled={postContent.length === 0}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [navigation, postContent, selectedAssets]);

  useEffect(() => {
    if (route.params) {
      const { postId, title } = route.params;

      post
        .getPost(postId, user.token)
        .then((res) => setPostContent(res.data.data.described))
        .catch((err) => console.log(err));

      navigation.setOptions({
        title: title,
      });
    }
  }, [route]);

  const convertToBase64 = async (assets) => {
    const mimeTypes = assets.map((asset) => {
      const fileName = asset.filename;
      const mediaType = asset.mediaType === "photo" ? "image" : "video";
      let extension = fileName.split(".")[1];
      if (extension === "jpg") {
        extension = "jpeg";
      }

      return `${mediaType}/${extension}`;
    });

    const assetPromises = assets.map((asset) => {
      const actions = [{ resize: { width: 200, height: 200 } }];
      const saveOptions = {
        compress: 0.9,
        base64: true,
      };
      return ImageManipulator.manipulateAsync(asset.uri, actions, saveOptions);
    });

    const convertedAssets = await Promise.all(assetPromises);

    const base64Assets = convertedAssets.map((asset, idx) =>
      formatIntoBase64String(asset.base64, mimeTypes[idx])
    );
    return base64Assets;
  };

  const formatIntoBase64String = (data, mediaType) => {
    return `data:${mediaType};base64,${data}`;
  };

  const handleMediaButtonPressed = async () => {
    const mediaLibraryPermission =
      await ImageHelper.askMediaLibraryPermission();

    if (mediaLibraryPermission) {
      navigation.navigate(stacks.mediaPicker.name);
    }
  };

  const handleSave = async () => {
    dispatch(uploadActions.uploading());
    dispatch(mediaActions.resetState());
    navigation.navigate(stacks.tabs.name);

    const now = new Date().getTime() / 1000;

    const imageAssets = selectedAssets.filter(
      (asset) => asset.mediaType === "photo"
    );
    const videoAssets = selectedAssets.filter(
      (asset) => asset.mediaType === "video"
    );

    const convertedImageAssets = await convertToBase64(imageAssets);
    const convertedVideoAssets = await convertToBase64(videoAssets);

    const postData = {
      described: postContent,
      images: convertedImageAssets,
      videos: convertedVideoAssets,
    };

    try {
      const result = route.params
        ? await post.editPost(route.params.postId, postData, user.token)
        : await post.addPost(postData, user.token);
      dispatch(uploadActions.uploadSuccess(result.data.data));
      console.log(`upload finised in ${new Date().getTime() / 1000 - now}`);
    } catch (err) {
      const errMsg = err.response ? err.response.message : "Error occured!";
      dispatch(uploadActions.uploadFailure(errMsg));
    }
  };

  const handleRemoveAsset = (asset) => {
    dispatch(mediaActions.removeAsset(asset));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
        containerStyle={styles.inputOutterWrapper}
        inputStyle={styles.inputText}
        multiline
        numberOfLines={25}
        underlineColorAndroid='transparent'
      />

      {selectedAssets.length > 0 && (
        <View style={styles.mediaContainer}>
          <FlatList
            data={selectedAssets}
            key={(item) => item.id}
            renderItem={({ item }) => (
              <ImageBackground
                source={{ uri: item.uri }}
                style={styles.media}
                resizeMode='cover'
              >
                <Icon
                  name='close'
                  type='ant-design'
                  size={16}
                  iconStyle={styles.removeIcon}
                  onPress={() => handleRemoveAsset(item)}
                />
              </ImageBackground>
            )}
            numColumns={2}
            style={{ flexGrow: 1 }}
          />
        </View>
      )}

      <View style={styles.buttonGroup}>
        <Icon type='entypo' name='emoji-happy' size={32} />
        <Icon
          type='material'
          name='image'
          size={32}
          iconStyle={{ marginHorizontal: 20 }}
          onPress={handleMediaButtonPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 4,
  },
  inputOutterWrapper: {
    height: 200,
    maxHeight: 200,
    marginBottom: 2,
  },
  inputText: {
    paddingTop: 10,
    textAlignVertical: "top",
    textAlign: "left",
  },
  mediaContainer: {
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  media: {
    width: DEVICE_WIDTH / 2 - 10,
    height: DEVICE_WIDTH / 2 - 10,
  },
  mediaButtonGroup: {
    flexDirection: "row",
    marginRight: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 20,
  },
  removeIcon: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});

CreatePost.propTypes = {};

export default CreatePost;
