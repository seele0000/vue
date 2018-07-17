import axios from 'axios';
export default {
  name: 'movie-detail',
  data() {
    return {
      id: '',
      commentList: [
        {id: 1, name: 'tom', msg: 'haha'},
        {id: 2, name: 'Lucy', msg: '还好吧'}
      ],
      obj: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
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
        });
    }
  }
};
