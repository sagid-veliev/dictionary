<template>
    <section class="wrapper">
        <div class="wrapper__title">
            <h1>{{ props.title }}</h1>
        </div>
        <div class="wrapper__filter">
            <slot name="filter"></slot>
        </div>
        <div class="wrapper__container">
            <slot name="list"></slot>
        </div>
    </section>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: '',
    },
});
</script>
<style lang="scss" scoped>
.wrapper {
    display: grid;
    margin: 0 auto;
    grid-template-rows: 100px auto;
    width: 1380px;
    gap: 15px;
    grid-template-columns: min(300px) 1fr;
    font-family: 'Montserrat', sans-serif;
    &__title {
        margin: auto 0;
        grid-column-start: 1;
        grid-column-end: 3;
        font-size: 22px;
        user-select: none;
    }
    &__filter {
        grid-column-start: 1;
        grid-column-end: 2;
    }
    &__container {
        display: flex;
        flex-direction: column;
        min-height: 450px;
        padding-bottom: 50px;
        gap: 10px;
        grid-column-start: 2;
        grid-column-end: 3;
    }
}
</style>
