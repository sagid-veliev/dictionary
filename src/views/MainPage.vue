<template>
     <dict-wrapper title="Word Keeper">
        <template #filter>
            <dict-filter :required="true" :starred="false" @get="getData"></dict-filter>
        </template>
        <template #list>
            <template v-if="list.length">
                <dict-word
                    v-for="word in list"
                    :key="word.id"
                    :word="word.word"
                    :definition="word.definition"
                    :part-of-speech="word.partOfSpeech"
                    :is-starred="false"
                    :phonetic="word.phonetic"
                    @fill="(fill) => toStarred(fill, word)"
                >
                </dict-word>
            </template>
            <template v-else>
                <p style="margin: 0 auto;">Данные отсутствуют...</p>
            </template>
        </template>
    </dict-wrapper>
</template>
<script setup>
import Storage from '@/store/services/storage';
import {
    computed,
    onBeforeMount,
    onMounted,
    onUnmounted,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let unsubscribe = null;

const list = computed(() => store.state.List.list);

const toStarred = (fill, value) => {
    if (fill) {
        store.commit('toStarred', value);
    } else {
        store.commit('fromStarred', value);
    }
};

const getData = (word) => {
    store.dispatch('getWords', word);
};

onBeforeMount(() => {
    store.commit('getFromStorage');
});

onMounted(() => {
    unsubscribe = store.subscribe((mutation, state) => {
        if (mutation.type === 'toStarred' || mutation.type === 'fromStarred') {
            Storage.setToStorage(state.Starred.starred, 'starred');
        } else if (mutation.type === 'sortList') {
            Storage.setToStorage(state.List.list, 'list');
        }
    });
});

onUnmounted(() => {
    unsubscribe();
});

</script>
<style lang="scss" scoped>
.warning {
    color: red;
    text-align: center;
}
</style>
