var app = new Vue({
    el: "#app",
    data: {
        city: '',
        weatherList: [],
    },
    methods: {
        searchWeather: function() {
            var that = this;
            // console.log('天气查询');
            // console.log(this.city);
            //调用接口
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city).then(function(response) {
                console.log(response.data.data.forecast);
                that.weatherList = response.data.data.forecast;
            }, function(err) {})
        },
        changeCity: function(city) {
            this.city = city;
            this.searchWeather();
        }
    }
})