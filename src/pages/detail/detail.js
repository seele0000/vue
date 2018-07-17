import axios from 'axios';
export default {
  name: 'movie-detail',
  data() {
    return {
      id: '',
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
