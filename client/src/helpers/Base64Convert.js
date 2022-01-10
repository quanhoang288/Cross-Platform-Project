import * as ImageManipulator from 'expo-image-manipulator';

const formatIntoBase64String = (data, mediaType) => {
  return `data:${mediaType};base64,${data}`;
};

const convertToBase64 = async (assets) => {
  const mimeTypes = assets.map((asset) => {
    const fileName = asset.filename;
    const mediaType = asset.mediaType === 'photo' ? 'image' : 'video';
    let extension = fileName.split('.')[1];
    if (extension === 'jpg') {
      extension = 'jpeg';
    }

    return `${mediaType}/${extension}`;
  });

  const assetPromises = assets.map((asset) => {
    const actions = [];
    const saveOptions = {
      base64: true,
      compress: 0.7,
    };
    return ImageManipulator.manipulateAsync(asset.uri, actions, saveOptions);
  });

  const convertedAssets = await Promise.all(assetPromises);

  const base64Assets = convertedAssets.map((asset, idx) =>
    formatIntoBase64String(asset.base64, mimeTypes[idx]),
  );
  return base64Assets;
};

export default convertToBase64;
