var postlist = new Vue({
  el: '#postlist',
  data: {
    items: [
    {"postid": "1111", "category": "category1", "title": "1", "description": "2", "price": 3, "time": "2018-03-15", "like": true, "user":"user123", "location":"NY", "imageDir":"http://placehold.it/500x300"},
    {"postid": "2222", "category": "category2", "title": "1", "description": "2", "price": 3, "time": "2018-03-15", "like": true, "user":"user123", "location":"NJ", "imageDir":"http://placehold.it/500x300"},
    {"postid": "3333", "category": "category3", "title": "1", "description": "2", "price": 3, "time": "2018-03-15", "like": true, "user":"user123", "location":"NY", "imageDir":"http://placehold.it/500x300"},
    ],
    filter_items: 0,
    filter_price_sorting: 0,
    filter_loc: "0",
    filter_post_time: 0,
    filter_search: "",
    filter_is_apply: false,
  },
  created(){
    $.ajax({
      url: '/postlist/seller',
      dataType: 'json',
      type: "POST",

      success: (json)=>{
          console.log(json);
          this.items = json;
          this.filter_items = json;
      },
      }).fail(function($xhr) {
          var data = $xhr.responseJSON;
          console.log(data);
      });
  },
  watch: {
    filter_price_sorting: function(){
      this.filter_center()
    },
    filter_loc: function(){
      this.filter_center()
    },
    filter_post_time: function(){
      this.filter_center()
    },
    filter_search: function(){
      this.filter_center()
    },
  },
  methods:{
    reset_filter: function(event){
      console.log("-filter_search")
      this.filter_price_sorting = 0
      this.filter_loc = "0"
      this.filter_post_time = 0
      this.filter_search = ""
    },

    filter_posts: function(filter_items, filter_search){
      return filter_items.filter((item) => {
        var matched = item.title.match(filter_search)
        items = filter_items
        for (var i = 0; i < items.length; i++){
          if(matched !== null){
            if(items[i].title == matched.input){
              return items[i]
            }
          }
        }
      })
    },

    filter_price: function(filter_items, filter_price_sorting){
      var items = filter_items
      var filter_items = []
      var new_index = []
      var price = []
      var price_with_index = []

      if(items === null || items === undefined){
        return items
      }

      for (var i = 0; i < items.length; i++){
        price_with_index.push((items[i].price))
      }

      if(filter_price_sorting == 0){
        return items
      }
      else if(filter_price_sorting == 1){
        price_with_index = this.sortWithIndeces(price_with_index, "ASC")
      }
      else if(filter_price_sorting == 2){
        price_with_index = this.sortWithIndeces(price_with_index, "DESC")
      }
      else{
        return items
      }

      new_index = price_with_index.sortIndices

      for (var i = 0; i < new_index.length; i++){
        filter_items.push((items[new_index[i]]))
      }

      return filter_items
    },

    filter_location: function(filter_items, location){
      var items = filter_items
      var filter_items = []

      if(location == "0")
      {
        return items
      }

      if(items === null || items === undefined){
        return items
      }

      // Only select the city.
      for (var i = 0; i < items.length; i++){
        if(items[i].location == location){
          filter_items.push(items[i])
        }
      }

      return filter_items
    },

    filter_time: function(filter_items, time){
      var items = filter_items
      var filter_items = []
      var post_dt = []
      var need_dt = 0

      if(location == "0")
      {
        return items
      }

      if(items === null || items === undefined){
        return items
      }


      var nowDate= new Date();
      if(time == 1){
        // Last 6 hours
        need_dt = new Date(nowDate.getFullYear(), nowDate.getMonth(),
                           nowDate.getDate(),nowDate.getHours() - 6,
                           nowDate.getMinutes(), nowDate.getSeconds());
      }
      else if(time == 2){
        // Last 24 hours
        need_dt = new Date(nowDate.getFullYear(), nowDate.getMonth(),
                           nowDate.getDate(),nowDate.getHours() - 24,
                           nowDate.getMinutes(), nowDate.getSeconds());
      }
      else if(time == 3){
        // Last 7 days
        need_dt = new Date(nowDate.getFullYear(), nowDate.getMonth(),
                           nowDate.getDate() - 7,nowDate.getHours(),
                           nowDate.getMinutes(), nowDate.getSeconds());
      }
      else if(time == 4){
        // Last 1 month
        need_dt = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1,
                           nowDate.getDate(),nowDate.getHours(),
                           nowDate.getMinutes(), nowDate.getSeconds());
      }
      else if(time == 5){
        // Last 3 months
        need_dt = new Date(nowDate.getFullYear(), nowDate.getMonth() - 3,
                           nowDate.getDate(),nowDate.getHours(),
                           nowDate.getMinutes(), nowDate.getSeconds());
      }

      for (var i = 0; i < items.length; i++){
        if(new Date(items[i].time) >= need_dt){
          filter_items.push(items[i])
        }
      } 

      return filter_items
    },

    sortWithIndeces: function(toSort, order) {
      for (var i = 0; i < toSort.length; i++) {
        toSort[i] = [toSort[i], i];
      }

      if(order == "ASC"){
        toSort.sort(function(left, right) {
          return left[0] < right[0] ? -1 : 1;
        });
      }
      else if(order == "DESC"){
        toSort.sort(function(left, right) {
          return left[0] > right[0] ? -1 : 1;
        });
      }

      toSort.sortIndices = [];
      for (var j = 0; j < toSort.length; j++) {
        toSort.sortIndices.push(toSort[j][1]);
        toSort[j] = toSort[j][0];
      }

      return toSort;
    },

    filter_center: function(){
      var filter_items = this.items
      var filter_price_sorting = this.filter_price_sorting
      var filter_loc = this.filter_loc
      var filter_post_time = this.filter_post_time
      var filter_search = this.filter_search
      var filter_search_items = []

      filter_items = this.filter_price(filter_items, filter_price_sorting)
      filter_items = this.filter_location(filter_items, filter_loc)
      filter_items = this.filter_time(filter_items, filter_post_time)
      filter_search_items.push(this.filter_posts(filter_items, filter_search))

      this.filter_items = filter_search_items[0]
    }
  }
});

/*Move to Top Button*/
Vue.component('backtotop', {
  template: '#backtotop',
  data: function() {
    return {
      isVisible: false
    };
  },
  methods: {
    initToTopButton: function() {
      $(document).bind('scroll', function() {
        var backToTopButton = $('.goTop');
        if ($(document).scrollTop() > 250) {
          backToTopButton.addClass('isVisible');
          this.isVisible = true;
        } else {
          backToTopButton.removeClass('isVisible');
          this.isVisible = false;
        }
      }.bind(this));
    },
    backToTop: function() {
      $('html,body').stop().animate({
        scrollTop: 0
      }, 'slow', 'swing');
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initToTopButton();
    });
  }
});

var app = new Vue({
  el: '#toTop'
});
