<template>
    <dict-wrapper title="Starred Word">
        <template #filter>
            <dict-filter @get="searchStarred"></dict-filter>
        </template>
        <template #list>
            <template v-if="starred.length">
                <div
                    class="list__container"
                >
                    <dict-word
                        style="cursor: pointer"
                        v-for="word in starred"
                        :key="word.id"
                        :word="word.word"
                        :definition="word.definition"
                        :part-of-speech="word.partOfSpeech"
                        :is-starred="true"
                        :phonetic="word.phonetic"
                        :id="word.id"
                        draggable="true"
                        @fill="(fill) => toStarred(fill, word)"
                        @onDragStart="(event) => onDragStart(event, word)"
                        @onDragEnd="(event) => onDragEnd(event)"
                        @onDragOver="(event) => onDragOver(event, word)"
                    >
                    </dict-word>
                </div>
            </template>
            <template v-else>
                <p style="margin: 0 auto;">Список избранных пуст...</p>
            </template>
        </template>
    </dict-wrapper>
</template>

<script setup>
import Storage from '@/store/services/storage';
import {
    computed,
    onUnmounted,
    onMounted,
    onBeforeMount,
    ref,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let unsubscribe = null;
const id = ref(null);

const starred = computed(() => store.state.Starred.starred);

const toStarred = (fill, value) => {
    if (!fill) {
        store.commit('toStarred', value);
    } else {
        store.commit('fromStarred', value);
    }
};

const searchStarred = (word) => {
    store.commit('searchStarred', word);
};

const onDragStart = (event, word) => {
    // получаю значение id активного слова
    id.value = word.id;
    const activeEl = event.target.closest('.cart');
    activeEl.classList.add('selected');
};

const onDragEnd = (event) => {
    const activeEl = event.target.closest('.cart');
    activeEl.classList.remove('selected');
};

const onDragOver = (event, word) => {
    // отслеживаю, если активное и текущее слово отличаются, то сохраняю изменения в стейт
    if (word.id !== id.value) {
        store.commit('changeStarredPos', { word, id });
    }
    const tasksList = document.querySelector('.list__container');
    const activeElement = document.querySelector('.selected');

    const currentElement = event.target.closest('.cart');

    const isMoveable = activeElement !== currentElement
    && currentElement.classList.contains('cart');

    if (!isMoveable) return;

    const nextElement = (currentElement === activeElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
    tasksList.insertBefore(activeElement, nextElement);
};

onBeforeMount(() => store.commit('getStarredFromStorage'));

onMounted(() => {
    unsubscribe = store.subscribe((mutation, state) => {
        if (mutation.type === 'filteredStarred' || mutation.type === 'searchStarred') return;
        Storage.setToStorage(state.Starred.starred, 'starred');
    });
});

onUnmounted(() => {
    unsubscribe();
});

</script>

<style scoped>
    .selected {
        opacity: 0.6;
    }

    .list__container {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
    }
</style>
