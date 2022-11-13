<template>
      <header class="header">
          <div class="header__container">
                <h2 class="header__title">
                    <router-link to="/main">Word Keeper</router-link>
                </h2>
                <div class="header__starred">
                    <div class="header-starred-icon">
                        <icon-star></icon-star>
                    </div>
                    <h2 class="header-starred-text">
                        <router-link to="/starred">Starred Words</router-link>
                    </h2>
                </div>
          </div>
      </header>
      <main class="container">
        <router-view></router-view>
      </main>
</template>

<script setup>
import IconStar from '@/assets/icons/IconStar.vue';
</script>

<style lang="scss">
@import '@/assets/fonts/fonts.scss';
@import '@/assets/styles/layout.scss';
</style>
