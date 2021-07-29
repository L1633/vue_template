
import axios from 'axios';

let STORAGE_PREFIX = ''; // `${PLATFORM.NAME}_`;

let instance = null;
let globalRequestInterceptor;

/**
 * @ignore
 * */
class DsUtils {
  /**
   * get 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function get
   */
  static get (...args) {
    return instance.get(...args);
  }

  /**
   * post 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function post
   */
  static post (...args) {
    return instance.post(...args);
  }

  /**
   * put 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function put
   */
  static put (...args) {
    return instance.put(...args);
  }

  /**
   * patch 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function patch
   */
  static patch (...args) {
    return instance.patch(...args);
  }

  /**
   * head 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function head
   */
  static head (...args) {
    return instance.head(...args);
  }

  /**
   * delete 请求。
   * @since 1.0.0
   * @param {string} url 请求地址
   * @param {object} [config] 额外配置,参见 {@link https://github.com/axios/axios#request-config}
   * @returns {Promise} response Promise
   * @function delete
   */
  static delete (...args) {
    return instance.delete(...args);
  }

  /**
   * 设置sessionStorage item，支持值为JSON object和数组
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {!*} value 值，如果为object或者array，需要设置param.isJson=true
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix sessionStorage里保存的key前缀
   * @param {?boolean} [param.isJson=false] 是否为string类型
   * @function setSessionStorageItem
   */
  static setSessionStorageItem (
    key,
    value, {
      storagePrefix = STORAGE_PREFIX,
      isJson = false
    } = {}
  ) {
    sessionStorage.setItem(
      storagePrefix + key,
      isJson ? JSON.stringify(value) : value
    );
    return DsUtils;
  }

  /**
   * 获取sessionStorage item，支持值为JSON object和数组
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix sessionStorage里保存的key前缀
   * @param {?boolean} [param.isJson=false] 是否为JSON类型
   * @return {string|array|object} 值。如果为object或者array，需要设置param.isJson=true
   * @function getSessionStorageItem
   */
  static getSessionStorageItem (
    key, {
      storagePrefix = STORAGE_PREFIX,
      isJson = false
    } = {}
  ) {
    let value = sessionStorage.getItem(storagePrefix + key);
    if (isJson) {
      value = JSON.parse(value);
    }
    return value;
  }

  /**
   * 移除sessionStorage中具体item
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix sessionStorage里保存的key前缀
   * @function removeSessionStorageItem
   */
  static removeSessionStorageItem (
    key, {
      storagePrefix = STORAGE_PREFIX
    } = {}
  ) {
    sessionStorage.removeItem(storagePrefix + key);
    return DsUtils;
  }

  /**
   * 清空所有sessionStorage
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix sessionStorage里保存的key前缀
   * @function clearSessionStorageItem
   */
  static clearSessionStorageItem () {
    sessionStorage.clear();
    return DsUtils;
  }

  /**
   * 设置localStorage item，支持值为JSON object和数组
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {!*} value 值，如果为object或者array，需要设置param.isJson=true
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix localStorage里保存的key前缀
   * @param {?boolean} [param.isJson=false] 是否为string类型
   * @function setLocalStorageItem
   */
  static setLocalStorageItem (
    key,
    value, {
      storagePrefix = STORAGE_PREFIX,
      isJson = false
    } = {}
  ) {
    localStorage.setItem(
      storagePrefix + key,
      isJson ? JSON.stringify(value) : value
    );
    return DsUtils;
  }

  /**
   * 获取localStorage item，支持值为JSON object和数组
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix localStorage里保存的key前缀
   * @param {?boolean} [param.isJson=false] 是否为JSON类型
   * @return {string|array|object} 值。如果为object或者array，需要设置param.isJson=true
   * @function getLocalStorageItem
   */
  static getLocalStorageItem (
    key, {
      storagePrefix = STORAGE_PREFIX,
      isJson = false
    } = {}
  ) {
    let value = localStorage.getItem(storagePrefix + key);
    if (isJson) {
      value = JSON.parse(value);
    }
    return value;
  }

  /**
   * 移除localStorage中具体item
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix localStorage里保存的key前缀
   * @function removeLocalStorageItem
   */
  static removeLocalStorageItem (key, {
    storagePrefix = STORAGE_PREFIX
  } = {}) {
    localStorage.removeItem(storagePrefix + key);
    return DsUtils;
  }

  /**
   * 清空所有localStorage
   * @since 1.0.0
   * @param {!string} key 主键
   * @param {?object} paramObj 参数对象
   * @param {?string} param.storagePrefix localStorage里保存的key前缀
   * @function clearLocalStorageItem
   */
  static clearLocalStorageItem () {
    localStorage.clear();
    return DsUtils;
  }

  static getInstance (baseUrl) {
    return this.createInstance({
      baseURL: baseUrl
    });
  }

  static init (baseUrl, storagePrefix) {
    STORAGE_PREFIX = storagePrefix;
    instance = this.createInstance({
      baseURL: baseUrl
      //   timeout: 1000,
      //   headers: { "X-Custom-Header": "foobar" }
    });
  }

  static addGlobalRequestInterceptor (interceptor) {
    globalRequestInterceptor = interceptor;
    axios.interceptors.request.use(globalRequestInterceptor); // use axios directly.
  }

  static createInstance (option) {
    const newInstance = axios.create(option);
    if (globalRequestInterceptor) {
      newInstance.interceptors.request.use(globalRequestInterceptor);
    }
    return newInstance;
  }
}
export default DsUtils;
