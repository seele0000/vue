import axios from 'axios';
export default {
  name: 'register',
  props: {
    registerType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tabType: '',
      userName: '',
      userPassword: '',
      flag: true
    };
  },
  watch:{
    registerType: function () {
      this.tabType = this.registerType;
    }
  },  
  methods: {
    closeRegister () {
      this.userName = '';
      this.userPassword = '';
      this.$emit('closeRegister')
    },
    result (data) {
      let _this = this;
      if(_this.tabType == 'in') {
        if(data.code == 200) {
          alert('登录成功！');
          sessionStorage.setItem("name", _this.userName);
          _this.$emit('closeRegister');
          _this.$emit('registSuccess');
        } else if (data.code == 400 || data.code == 500) {
          alert('用户名或密码错误')
        }
      } else {
        if (data.code == 300) {
          alert('用户名已存在');
        } else if (data.code == 200) {
          alert('创建成功');
          sessionStorage.setItem("name", _this.userName);
          _this.closeRegister();
          _this.$emit('registSuccess');
        }
      }
    },
    submit () {
      let _this = this;
      let url = '';
      let user = {
        name: _this.userName.replace(/(^\s*)|(\s*$)/g,""),
        password: _this.userPassword.replace(/(^\s*)|(\s*$)/g,"")
      }
      if(user.name == '' || user.password == '') {
        alert('请输入用户名或密码');
        return;
      } else if (_this.flag) {
        _this.flag = false;
        if(_this.tabType == 'in') {
          url = '//192.168.10.165:3000/user/find';
        } else {
          url = '//192.168.10.165:3000/user/create'
        }
        console.log(_this.tabType,url)
        axios.post(url, {
          params: user
        })
        .then(function (response) {
          console.log(response.data);
          alert(response.data.msg)
          _this.flag = true;
          _this.result(response.data);
        })
        .catch(function (error) {
          alert('请稍后再试！');
          _this.flag = true;
          console.log(error);
        });
      }
    }
  }
};
