<template>
    <div
        class="cart"
        @dragstart="onDragStart($event)"
        @dragend="onDragEnd($event)"
        @dragover.prevent="onDragOver($event)"
        :draggable="props.draggable"
    >
        <div class="cart__main">
            <div
                class="cart__burger"
                @click="showMore = !showMore"
            >
                <icon-burger :showMore="showMore"></icon-burger>
            </div>
            <div class="cart__word">
                {{ props.word }}
            </div>
            <div class="cart__part">
                {{ props.partOfSpeech }}
            </div>
            <p class="cart__definition">
                {{ props.definition[0] }}
            </p>
            <div class="cart__starred" @click="toStarred(fill)">
                <icon-star :fill="props.isStarred ? !fill : fill" stroke="#64B5F6"></icon-star>
            </div>
        </div>
        <div v-if="showMore" class="cart__additional">
            <template v-if="props.definition.length > 1">
                <h4>Other definitions:</h4>
                <template v-for="(item, index) in props.definition" :key="index">
                    <div
                        v-if="index > 0"
                        class="cart-additional-def"
                    >
                        {{ getDefinitions(item, index) }}
                    </div>
                </template>
            </template>
            <template v-if="props.phonetic.length">
                <h4>Transcriptions:</h4>
                <div v-for="(item, index) in props.phonetic" :key="index">
                    {{ getPhonetic(item, index + 1) }}
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import IconStar from '@/assets/icons/IconStar.vue';
import IconBurger from '@/assets/icons/IconBurger.vue';

const showMore = ref(false);

const props = defineProps({
    word: {
        type: String,
        required: true,
        default: '',
    },
    partOfSpeech: {
        type: String,
        required: true,
        default: '',
    },
    definition: {
        type: Array,
        required: true,
        default: (() => []),
    },
    isStarred: {
        type: Boolean,
        default: false,
    },
    phonetic: {
        type: Array,
        required: true,
        default: (() => []),
    },
    id: {
        type: String,
        default: null,
    },
    draggable: {
        type: String,
        default: 'false',
    },
});

const emit = defineEmits(['fill', 'onDragStart', 'onDragEnd', 'onDragOver']);

const fill = ref(false);

const toStarred = () => {
    fill.value = !fill.value;
    emit('fill', fill.value);
};

const onDragStart = (event) => {
    emit('onDragStart', event);
};

const onDragEnd = (event) => {
    emit('onDragEnd', event);
};

const onDragOver = (event) => {
    emit('onDragOver', event);
};

const getPhonetic = (item, index) => `${index}) ${item})`;
const getDefinitions = (item, index) => `${index}) ${item}`;

</script>

<style lang="scss" scoped>
.cart {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    border-radius: 5px;
    background: white;
    font-family: 'Montserrat', sans-serif;
    &__main {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        gap: 15px;
    }
    &__burger {
        margin-top: 3px;
        flex: 0.05;
        cursor: pointer;
        transition: 0.6s ease-out;
        &-active {
            transform: rotate(180deg);
            transition: 0.5s ease-out;
        }
        &-notactive {
            transform: rotate(360deg);
            transition: 0.5s ease-out;
        }
    }
    &__word {
        flex: 0.1;
        font-weight: bold;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    &__part {
        flex: 0.1;
        float: left;
        font-style: italic;
    }
    &__definition {
        flex: 0.7;
        min-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    &__starred {
        flex: 0.05;
        cursor: pointer;
    }
    &__additional {
        margin-left: 55px;
        padding-bottom: 20px;
    }
}
</style>
