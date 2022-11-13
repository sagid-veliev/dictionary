import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DictWrapper from './components/DictWrapper.vue';
import DictCheckbox from './components/DictCheckbox.vue';
import DictFilter from './components/DictFilter.vue';
import DictWord from './components/DictCart.vue';

const app = createApp(App);

app
    .use(store)
    .use(router)
    .component('DictWrapper', DictWrapper)
    .component('DictCheckbox', DictCheckbox)
    .component('DictFilter', DictFilter)
    .component('DictWord', DictWord)
    .mount('#app');
