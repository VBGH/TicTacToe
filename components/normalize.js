import { Platform, PixelRatio } from 'react-native';
import layout from '../constants/Layout';

const {
   width: SCREEN_WIDTH,
} = layout.window;

const scale = SCREEN_WIDTH / 320;

export default function normalize(size) {
   const newSize = size * scale
   if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
   } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
   }
}