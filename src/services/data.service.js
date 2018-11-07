/**
 * DataService
 * This service centralized all the data of the app
 * It can get and set data in the localStorage when the values
 * are set
 */

class _DataService {

    _accounts;
    _bikes;
    _adminUser;
    _user;
    _stations;
    
    get accounts() {
        return this._accounts;
    }
    set accounts (val) {
        this._accounts = val;
        this.setStorage('accounts', val);
    }
    
    get bikes() {
        return this._bikes;
    }
    set bikes (val) {
        this._bikes = val;
        this.setStorage('bikes', val);
    }
    
    get adminUser() {
        return this._adminUser;
    }
    set adminUser (val) {
        this._adminUser = val;
        this.setStorage('adminUser', val);
    }
    
    get user() {
        return this._user;
    }
    set user (val) {
        this._user = val;
        this.setStorage('user', val);
    }
    
    get stations() {
        return this._stations;
    }
    set stations (val) {
        this._stations = val;
        this.setStorage('stations', val);
    }
    
    getStorage(key) {
        let value = window.localStorage.getItem(key);
        var json = value ? JSON.parse(value): null;
        this[key] = json;
        return json;
    }
    
    setStorage(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    
    removeStorage(key) {
        window.localStorage.removeItem(key);
    }

    setAdmin() {
        this.adminUser = true;
    }

    saveData(key) {
        window.localStorage.setItem(key, JSON.stringify(this[key]));
    }

    resetUser() {
        this.user = null;
        this.adminUser = null;
        this.removeStorage('user');
        this.removeStorage('adminUser');
    }

    addAccount(user) {
        const accounts = [...this.accounts, user];
        this.accounts = accounts;
        this.user = user;
    }
}

const DataService = new _DataService();
export default DataService;