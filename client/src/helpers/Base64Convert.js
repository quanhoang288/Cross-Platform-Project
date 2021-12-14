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
        compress: 0.5,
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

export default convertToBase64;