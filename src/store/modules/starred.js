import Storage from '../services/storage';

export default {
    state: () => ({
        starred: [],
    }),
    mutations: {
        // добавление к избранным и проверка на существование там такого объекта.
        toStarred(state, payload) {
            if (!(state.starred.every((item) => item.id !== payload.id))) return;
            state.starred.push(payload);
        },
        // удаление из избранных
        fromStarred(state, payload) {
            state.starred = state.starred.filter((item) => item.id !== payload.id);
        },
        // получение из хранилища
        getStarredFromStorage(state) {
            state.starred = Storage.getFromStorage(state.starred, 'starred');
        },
        // фильтр части речи (включил только те, что на скринщотах)
        filteredStarred(state, payload) {
            this.commit('getStarredFromStorage');
            if (payload.length) {
                state.starred = state.starred.filter((item) => payload.includes(item.partOfSpeech));
            }
        },
        // поиск по избранным
        searchStarred(state, payload) {
            this.commit('getStarredFromStorage');
            if (payload) {
                state.starred = state.starred.filter((item) => item.word.includes(payload.toLowerCase()));
            }
        },
        // синхронизация изменений порядка списка избранных с состоянием
        changeStarredPos(state, payload) {
            const activeIndex = state.starred.findIndex((item) => item.id === payload.word.id);
            const currentIndex = state.starred.findIndex((item) => item.id === payload.id.value);
            [state.starred[activeIndex], state.starred[currentIndex]] = [state.starred[currentIndex], state.starred[activeIndex]];
        },
    },
};
