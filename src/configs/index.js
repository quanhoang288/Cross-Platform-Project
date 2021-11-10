import { Platform } from "react-native";
import {WEB_API_URL, MOBILE_API_URL} from '@env';

export const API_URL = Platform.OS === 'web' ? WEB_API_URL : MOBILE_API_URL;
