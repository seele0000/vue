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
      msg: '',
      tabType: ''
    };
  },
  watch:{
    registerType: function () {
      this.tabType = this.registerType;
      console.log(this.registerType)
    }
  },  
  methods: {
    closeRegister () {
      let _this = this;
      this.$emit('closeRegister')
    }
  }
};
