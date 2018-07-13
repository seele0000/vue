<template>
  <div id="app">
    <my-header></my-header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import myHeader from './components/myHeader/myHeader.vue';
export default {
    name: 'App',
    components: {
        myHeader
    }
};
</script>

<style lang="scss" src="./assets/common/common.scss"></style>
