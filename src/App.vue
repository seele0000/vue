<template>
  <div id="app">
    <my-header v-on:showRegister="changeRegister" v-bind:loginFlag="loginFlag" v-bind:userName="userName"></my-header>
    <register v-show="isShowRegister" v-on:closeRegister="changeRegister" v-bind:registerType="registerType"></register>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="./assets/api.config.js"></script>

<script>
  import axios from 'axios';
  import myHeader from './components/myHeader/myHeader.vue';
  import register from './components/register/register.vue';
  export default {
    name: 'App',
    data () {
      return {
        isShowRegister: false,
        loginFlag: true,
        registerType: '',
        userName: 'me'
      }
    },
    components: {
      myHeader,
      register
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
      },
      changeRegister (type) {
        if (type) {
          this.isShowRegister = true;
          this.registerType = type;
        } else {
          this.isShowRegister = false;
        }
      }
    }
  };
</script>

<style lang="scss" src="./assets/common/common.scss"></style>
