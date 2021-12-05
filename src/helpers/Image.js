import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

/**
 * Queries for user-created albums in media gallery
 * 
 * @returns array of user created albums
 */
const getAlbumList = async () => {
    const albums = await MediaLibrary.getAlbumsAsync();
    return albums;
}

/**
 * Queries for an album with a specific name.
 * 
 * @param {string} albumName name of the album to look for
 * @returns an object representing an Album if exists, otherwise return null
 */
const getAlbum = async (albumName) => {
    const album = await MediaLibrary.getAlbumAsync(albumName);
    return album;
}

/**
 * Fetches all assets matching the provided criteria.
 * 
 * @param {AlbumRef} album Album or its ID to get assets from specific album
 * @returns {import('expo-media-library').PagedInfo} object with array of Assets
 */
const getAssetsInAlbum = async (album) => {
    const options = {
        first: album.assetCount,
        album: album,
        sortBy: ['creationTime'],
        mediaType: ['photo', 'video']
    };

    const assets = await MediaLibrary.getAssetsAsync(options);
    return assets;
}

const launchCamera = async () => {
    const isCameraEnabled = await ImagePicker.getCameraPermissionsAsync();

    if (!isCameraEnabled.granted) {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            return false;
        }
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, 
        allowsEditing: true,
        aspect: [4, 5],
        videoMaxDuration: 120,
        quality: 0.5,
        base64: true
    });

    return result;
}

const askMediaLibraryPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    
    if (permission.granted) {
        return true;
    }
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    return granted;
}

export  { askMediaLibraryPermission, getAlbumList, getAlbum, getAssetsInAlbum, launchCamera };