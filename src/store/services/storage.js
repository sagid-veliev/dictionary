export default class Storage {
    static getFromStorage(state, keyName) {
        if (localStorage.getItem(keyName) != null) {
            state = JSON.parse(localStorage.getItem(keyName));
        }
        return state;
    }

    static setToStorage(state, list) {
        localStorage.setItem(list, JSON.stringify(state));
    }
}
