<template>
  <div id="app">
    <my-header v-on:showRegister="changeRegister" v-bind:loginFlag="loginFlag" v-bind:userName="userName"></my-header>
    <register v-show="isShowRegister" v-on:closeRegister="changeRegister" v-on:registSuccess="registSuccess" v-bind:registerType="registerType"></register>
    <div class="wrapper">
      <router-view v-on:showRegister="changeRegister"></router-view>
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
      if(sessionStorage.getItem("name")) {
        this.userName = sessionStorage.getItem("name");
        this.loginFlag = false;
      }
    },
    methods: {
      equipmentTest () {
        // 移动端计算font-size
        let layout = {
          w: 750,
          h: 1280,
          c: 7.5
        };
        test();
        window.onresize = test;
        function test () {
          let a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (a) {
            setFontSize();
          } else {
            document.documentElement.style.fontSize = '16px';
          }
        }
        function setFontSize () {
          // let fontSizeW = document.documentElement.clientWidth / layout.c;
          // let fontSizeH = document.documentElement.clientHeight / (layout.h / (layout.w / layout.c));
          // let fontSize = Math.min(fontSizeW, fontSizeH);
          // document.documentElement.style.fontSize = fontSize + 'px';
          var c = document.documentElement.clientWidth || document.body.clientWidth;
          document.documentElement.style.fontSize = c / 7.5 + 'px';
        }
      },
      changeRegister (type) {
        if (type) {
          this.isShowRegister = true;
          this.registerType = type;
        } else {
          this.isShowRegister = false;
        }
      },
      registSuccess () {
        this.loginFlag = false;
        this.userName = sessionStorage.getItem("name");
        console.log(this.userName)
      }
    }
  };
</script>

<style lang="scss" src="./assets/common/common.scss"></style>
