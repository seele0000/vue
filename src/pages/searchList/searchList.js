import axios from 'axios';
import in_theater_list from '../../assets/data/in_theater_list.json';
import top250_list from '../../assets/data/top250_list.json';

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
          // console.log(error);
          _this.list = _this.localData(queryMsg);
        });
    },
    localData (queryMsg) {
      let _this = this;
      let list = in_theater_list.concat(top250_list);
      let result = [];
      console.log(list.length)
      for(let i=0; i<list.length; i++) {
        if(list[i].title == queryMsg) {
          result.push(list[i]);
          console.log(result)
          return result;
        }
      }
    }
  }
};