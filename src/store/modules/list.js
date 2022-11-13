import Api from '../services/api';
import Storage from '../services/storage';

export default {
    state: () => ({
        list: [],
    }),
    mutations: {
        // заполнение состояния
        fillList(state, payload) {
            // в процессе тестирования отследил, что, в случае, если введено несуществующее слово, API шлет 20 похожих слов
            // если слово корректное, то API шлет 10 вариантов.'
            if (payload.length > 10) {
                state.list = [];
                return;
            }
            const parsedPayload = payload.map((elem) => ({
                word: elem.hwi?.hw.replace(/\*/g, ''), // иногда слова приходят деленые по слогам
                partOfSpeech: elem.fl,
                id: elem.meta.uuid,
                definition: elem.shortdef,
                phonetic: elem.hwi.prs?.map((item) => item.mw),
            }));
            this.commit('sortList', parsedPayload);
        },
        // сортировка по алфавиту
        sortList(state, payload) {
            const sortedList = payload.sort((a, b) => {
                if (a.word > b.word) {
                    return 1;
                } if (a.word < b.word) {
                    return -1;
                }
                return 0;
            });
            state.list = sortedList;
        },
        // получение из хранилища
        getFromStorage(state) {
            state.list = Storage.getFromStorage(state.list, 'list', this);
        },
    },
    actions: {
        async getWords(context, word) {
            Api.get(word, context);
        },
    },
};
