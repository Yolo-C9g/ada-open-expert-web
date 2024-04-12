export default class StorageHelper {
    constructor() {}

    /**
     * 设置sessionStorage
     * @param key 
     * @param content 
     * @returns 
     */
    static set (key:string, content:any) {
        if (!key) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(key, content);
    }

    /**
     * 获取sessionStorage
     * @param key 
     * @returns 
     */
    static get (key: string) {
        if (!key) return null;
        const _storage = window.sessionStorage.getItem(key)
        if (_storage) {
            return JSON.parse(_storage)
        }
        return null
    }

    /**
     * 通过key，删除sessionStorage
     * @param key 
     * @returns 
     */
    static remove (key: string) {
        if (!key) {
            return;
        }
        window.sessionStorage.removeItem(key);
    }

    /**
     * 删除所有sessionStorage
     */
    static clear () {
        window.sessionStorage.clear()
    }
}