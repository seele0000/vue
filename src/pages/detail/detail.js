import axios from 'axios';
import in_theater_list from '../../assets/data/in_theater_list.json';
import top250_list from '../../assets/data/top250_list.json';

export default {
  name: 'movie-detail',
  data() {
    return {
      id: '',
      title: '',
      commentList: [],
      commentMsg: '',
      obj: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    this.getCommentList();
  },
  methods: {
    getDetail () {
      let _this = this;
      axios.get(process.env.API_ROOT + '/v2/movie/subject/' + this.id)
        .then(function (response) {
          _this.obj = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          _this.obj = _this.localData();
        });
    },
    localData () {
      let _this = this;
      let list = in_theater_list.concat(top250_list);
      for(let i=0; i<list.length; i++) {
        if(list[i].id == _this.id) {
          return list[i];
        }
      }
    },
    getCommentList () {
      let _this = this;
      axios.post('//192.168.10.165:3000/message/list', {
        params: {
          movieId: _this.id,
        }
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data.code == 200) {
          _this.commentList = response.data.data;
          console.log(_this.commentList)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    submitComment () {
      let _this = this;
      console.log(sessionStorage.getItem("name"))
      if(sessionStorage.getItem("name")) {
        axios.post('//192.168.10.165:3000/message/insert', {
          params: {
            movieId: _this.id,
            name: sessionStorage.getItem("name"),
            title: _this.obj.title,
            msg: _this.commentMsg
          }
        })
        .then(function (response) {
          console.log(response.data);
          _this.commentMsg = '';
          if(response.data.code == 200) {
            _this.getCommentList();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        _this.$emit('showRegister', 'in');
      }
    }
  }
};
