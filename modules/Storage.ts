class StyleSheetStorage {
  set(key: string, value) {
    this[key] = value;
  }

  get(key: string) {
    return this[key];
  }

  exist(key: string) {
    return Boolean(this[key]);
  }
}

export default StyleSheetStorage;
