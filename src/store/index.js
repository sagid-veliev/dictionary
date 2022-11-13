import { createStore } from 'vuex';
import Starred from './modules/starred';
import List from './modules/list';

export default createStore({
    modules: {
        Starred,
        List,
    },
});
