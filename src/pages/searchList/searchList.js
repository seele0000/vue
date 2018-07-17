import axios from 'axios';
export default {
  name: 'searchList',
  data () {
    return {
      queryMsg: '',
      list: []
    };
  },
  watch:{
    $route(to,from){
        this.queryMsg = this.$route.params.q;
        this.getList(this.$route.params.q)
    }
  },
  created () {
    let _this = this;
		this.queryMsg = this.$route.params.q;
		this.getList(_this.queryMsg);
  },
  methods: {
    getList (queryMsg) {
      let _this = this;
      console.log()
      axios.get(process.env.API_ROOT + '/v2/movie/search?count=10&q=' + queryMsg)
        .then(function (response) {
          _this.list = response.data.subjects;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};