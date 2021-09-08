/**
 * A utility service for interacting with the browser's local storage
 */
const localStorageService = {
  get(key) {
    // TODO: Checkout JWT expiration time and issue new one if needed?
    return JSON.parse(localStorage.getItem(key));
  },

  set(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

export default localStorageService;
