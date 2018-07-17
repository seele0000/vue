<template>
  <div id="app">
    <my-header></my-header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="./assets/api.config.js"></script>

<script>
  import axios from 'axios';
  import myHeader from './components/myHeader/myHeader.vue';
  export default {
    name: 'App',
    components: {
      myHeader
    },
    created () {
      this.equipmentTest();
    },
    methods: {
      equipmentTest () {
        // 移动端计算font-size
        let layout = {
          w: 750,
          h: 1280,
          c: 7.5
        };
        let a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        console.log(a);
        if (a) {
          setFontSize();
        }
        function setFontSize () {
          let fontSizeW = document.documentElement.clientWidth / layout.c;
          let fontSizeH = document.documentElement.clientHeight / (layout.h / (layout.w / layout.c));
          let fontSize = Math.min(fontSizeW, fontSizeH);
          document.documentElement.style.fontSize = fontSize + 'px';
        }
      }
    }
  };
</script>

<style lang="scss" src="./assets/common/common.scss"></style>
