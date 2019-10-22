import { Dimensions, Platform, PixelRatio } from 'react-native';
import layout from '../constants/Layout';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = layout.window;

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export default function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}