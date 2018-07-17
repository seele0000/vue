export default {
  name: 'myHader',
  data () {
    return {
      pageType: 'index',
      msg: ''
    };
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
    }
  }
};
