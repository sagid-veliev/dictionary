<template>
    <div class="filter">
        <div class="search" style="display: inline-flex; position: relative; align-items: center">
            <input
                v-model="word"
                class="search__input"
                :class="{'search__validate': validateError}"
                :placeholder="validateError ? validateMsg : 'search'"
                type="text"
                @input="getData(word)"
            />
            <div class="search__icon">
                <icon-search></icon-search>
            </div>
        </div>
        <div v-if="props.starred" class="filter__checkbox">
            <dict-checkbox v-model="filters" value="adjective" label-title="adjective"></dict-checkbox>
            <dict-checkbox v-model="filters" value="verb" label-title="verb"></dict-checkbox>
            <dict-checkbox v-model="filters" value="noun" label-title="noun"></dict-checkbox>
        </div>
    </div>
</template>
<script setup>
import IconSearch from '@/assets/icons/IconSearch.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import Validate from '@/utils/validate';

const store = useStore();
const filters = ref([]);
const validateError = ref(false);
const validateMsg = ref('');

watch(
    () => filters,
    (filter) => {
        store.commit('filteredStarred', filter.value);
    },
    { deep: true },
);

const emit = defineEmits(['get']);

const props = defineProps({
    starred: {
        type: Boolean,
        default: true,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const getData = (word) => {
    if (props.required) {
        validateError.value = Validate.isEmpty(word);
        if (validateError.value) {
            validateMsg.value = Validate.errorMessage();
            return;
        }
    }
    emit('get', word);
};
</script>
<style lang="scss" scoped>
.filter {
    display: flex;
    flex-direction: column;
    min-height: 80px;
    width: 100%;
    border-radius: 5px;
    background: #ECEFF1;
    &__checkbox {
        margin: 0 10px;
    }
}
.search {
    display: inline-flex;
    position: relative;
    &__input {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        margin: 20px auto;
        width: 75%;
        padding: 5px 40px 5px 10px;
        font-size: 20px;
        height: 25px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #64B5F6;
        &::placeholder {
            font-size: 20px;
            color: rgb(224, 224, 224);
        }
    }
    &__icon {
        position: absolute;
        left: 86%;
        height: 24px;
    }
    &__validate {
        border: 1px solid red;
        &::placeholder {
            font-size: 12px;
            color: red;
        }
    }
}
</style>
