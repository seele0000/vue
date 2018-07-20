export default {
  name: 'myHader',
  data () {
    return {
      pageType: 'index',
      msg: ''
    };
  },
  props: {
    loginFlag: {
      type: Boolean,
      required: true 
    },
    userName: {
      type: String,
      required: true 
    }
  },
  watch:{
    $route(to,from){
        console.log(to.path, from.path);

        if(/in_theaters/.test(to.path)) {
          this.pageType = 'in_theaters';
        } else if (/top250/.test(to.path)) {
          this.pageType = 'top250';
        } else if (to.path == '/') {
          this.pageType = 'index';
        } else {
          this.pageType = '';
        }
    },
    loginFlag: function () {
      // this.tabType = this.loginFlag;
      console.log(this.loginFlag);
    },
    userName: function () {
      // this.tabType = this.loginFlag;
      console.log(this.loginFlag);
    }
  },
  methods: {
    searchFn () {
      let _this = this;
      let curMsg = _this.msg.replace(/(^\s*)|(\s*$)/g,"");
      if(curMsg == '') {
        alert('请输入关键字');
      } else {
        this.$router.push({path: '/searchList/' + _this.msg});
        console.log()
      }
      _this.msg = '';
    },
    register (type) {
      console.log('head',type)
      this.$emit('showRegister', type)
    }
  }
};
