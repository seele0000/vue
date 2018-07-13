import axios from 'axios';
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
			axios.get('/api/movie/' + _this.type + '?start='+ curStart +'&count=' + _this.count)
				.then(function (response) {
					_this.title = response.data.title;
					_this.totalMovieN = response.data.total;
					_this.totalPageN = _this.calPage(response.data.total)
					_this.list = response.data.subjects;
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		calPage (n) {
			let _this = this;
			return Math.ceil(n/_this.count);
        },
  }
};