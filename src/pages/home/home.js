import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      theaterList: [],
      top250List: [],
      weeklyList: [],
      usBoxList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
			// axios.get('/api/movie/in_theaters')
      //   .then(function (response) {
      //     _this.theaterList = response.data.subjects.slice(0, 5);
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // axios.get('/api/movie/top250')
      //   .then(function (response) {
      //       _this.top250List = response.data.subjects.slice(0, 5);
      //       console.log(response.data);
      //   })
      //   .catch(function (error) {
      //       console.log(error);
			// 	});			
    }
  }
};
