import {Platform, Dimensions, PixelRatio} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const TEXT_SIZE_REGULAR_DEFAULT = 14;
export const TEXT_SIZE_MEDIUM_DEFAULT = 16;
export const TEXT_SIZE_HEADER_DEFAULT = 18;
export const HEADING_SIZE_REGULAR_DEFAULT = 20;
export const HEADING_SIZE_MEDIUM_DEFAULT = 22;

const {width, height} = Dimensions.get('window');

const screenType = height > 800 ? 830 : 670;

export const sizeDynamic = (size: number): number => {
  const screen = height;
  return PixelRatio.roundToNearestPixel((screen * size) / screenType);
};

export const widthPercentageToDP = (widthPercent: string): number => {
  const screenWidth = width;
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100,
  );
};

export const heightPercentageToDP = (heightPercent: string): number => {
  const screenHeight = height;
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100,
  );
};

export const getHeightPercentage = (value: number): number => {
  return PixelRatio.roundToNearestPixel(value);
};
