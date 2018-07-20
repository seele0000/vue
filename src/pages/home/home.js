import axios from 'axios';
import in_theater_list from '../../assets/data/in_theater_list.json';
import top250_list from '../../assets/data/top250_list.json';

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
       
			axios.post(process.env.API_ROOT + '/v2/movie/in_theaters')
        .then(function (response) {
          _this.theaterList = response.data.subjects.slice(0, 5);
          console.log(response.data);
        })
        .catch(function (error) {
          // console.log(error);
          console.log('JSON data');
          _this.theaterList = in_theater_list.slice(0, 5);
        });

      axios.get(process.env.API_ROOT + '/v2/movie/top250')
        .then(function (response) {
            _this.top250List = response.data.subjects.slice(0, 5);
            console.log(response.data);
        })
        .catch(function (error) {
            // console.log(error);
            console.log('JSON data');
            _this.top250List = top250_list.slice(0, 5);
				});			
    }
  }
};
