import axios from 'axios';
import in_theater_list from '../../assets/data/in_theater_list.json';
import top250_list from '../../assets/data/top250_list.json';
export default {
  name: 'list',
  data () {
    return {
      type: '',
			title: '',
			count: 10,
			totalMovieN: 0,
			totalPageN: 0,
			curPageN: 0,
      list: []
    };
  },
  watch:{
    $route(to,from){
        this.type = to.path.slice(6);
        this.getList(1);
        console.log(to.path, from.path);
    }
  },
  created () {
		this.type = this.$route.params.type;
		this.getList(1);
  },
  methods: {
		getList (start) {
			let _this = this;
			let curStart = (start == 1) ? 0 : ((start - 1) * _this.count);
			_this.curPageN = start;
			axios.get(process.env.API_ROOT + '/v2/movie/' + _this.type + '?start='+ curStart +'&count=' + _this.count)
				.then(function (response) {
					_this.title = response.data.title;
					_this.totalMovieN = response.data.total;
					_this.totalPageN = _this.calPage(response.data.total)
					_this.list = response.data.subjects;
					console.log(response.data);
				})
				.catch(function (error) {
          console.log(error);
          _this.localData(curStart);
				});
    },
    localData (start) {
      let _this = this;
      console.log('localData')
      if(_this.type == 'in_theaters') {
        _this.title = '正在上映的电影-北京';
        _this.totalMovieN = in_theater_list.length;
        _this.totalPageN = _this.calPage(in_theater_list.length);
        _this.list = in_theater_list.slice(start, start + _this.count);
      } else if (_this.type == 'top250') {
        _this.title = '豆瓣电影Top250';
        _this.totalMovieN = top250_list.length;
        _this.totalPageN = _this.calPage(top250_list.length);
        _this.list = top250_list.slice(start, start + _this.count);
      }
    },
		calPage (n) {
			let _this = this;
			return Math.ceil(n/_this.count);
        },
  }
};