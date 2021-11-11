import { Platform } from "react-native";

export const API_URL = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://192.168.1.5:8000';
