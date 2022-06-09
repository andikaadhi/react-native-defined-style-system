import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

class StyleSheetStorage {
  private storage: { [key: string]: ViewStyle | TextStyle | ImageStyle };

  get(key: string) {
    return this.storage[key];
  }

  set(key: string, styleSheet: ViewStyle | TextStyle | ImageStyle) {
    this.storage[key] = styleSheet;
  }
}

export default StyleSheetStorage;
