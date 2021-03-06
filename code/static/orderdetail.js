var userinfo = new Vue({
    el: '#buttons',
    data: {
        review: undefined,
        rating: 0,
        reviewee: 'null',
        orderId: undefined,
        review_submit: false,
        trackNo: undefined,
        carrier: undefined,
        ship_submit: false,
        text_max: 150,
        text_length: 0,
    },
    watch: {
        // whenever question changes, this function will run
        review: function () {
          this.text_length = this.review.length
        }
    },
    methods: {

        get_order_id: function(){
            var href = window.location.href;
            var orderId = href.substr(href.indexOf("orderId")+8, 9)

            return orderId  
        },

        AddSellerReview: function() {
            var reviewee_text = $("#buyer").text().replace(/ /g,'');
            var reviewee = reviewee_text.substring(reviewee_text.indexOf(':')+1, reviewee_text.length-1)
            this.AddReview(reviewee)
        },

        AddBuyerReview: function() {
            var reviewee_text = $("#seller").text().replace(/ /g,'');
            var reviewee = reviewee_text.substring(reviewee_text.indexOf(':')+1, reviewee_text.length-1)
            this.AddReview(reviewee)
        },

        AddReview:function(reviewee){
            this.orderId = this.get_order_id()

            var tdata = {'reviewee':reviewee, 'rating':this.rating,
                         'content':this.review, 'orderId':this.orderId}
            console.log(tdata)

            this.review_submit = true

            $.ajax({
            url: '/addReview',
            type: 'POST',
            data: tdata,
            dataType : 'json',
            success: (data) => {
                window.location.reload(true);
            },
            }).fail(function($xhr) {
              var data = $xhr.responseJSON;
            });
        },

        ShipOrder:function(){
            console.log('ShipOrder')
            console.log(this.carrier === undefined)
            console.log(this.trackNo === undefined)

            if (this.carrier === undefined || this.trackNo === undefined) {
                if (this.carrier === undefined) {
                    document.getElementById("error1").innerHTML = "Please select a shipping carrier.";
                } else {
                    document.getElementById("error1").innerHTML = "";
                }
                if (this.trackNo === undefined) {
                    document.getElementById("error2").innerHTML = "Please input a valid track number.";
                } else {
                    document.getElementById("error2").innerHTML = "";
                }
            }
            else {

                this.orderId = this.get_order_id()

                var tdata = {'carrier':this.carrier, 'trackNo':this.trackNo, 'orderId':this.orderId}

                this.ship_submit = true

                $.ajax({
                url: '/shipOrder',
                type: 'POST',
                data: tdata,
                dataType : 'json',
                success: (data) => {
                    console.log(data);
                    if (data === "succeeded") {
                        this.updateOrderStatus('Shipped');
                    }
                },
                }).fail(function($xhr) {
                  var data = $xhr.responseJSON;
                });

            }

        },

        updateOrderStatus : function(nextStatus) {
            console.log('update order status')
            var orderId = this.get_order_id();
            var udata = {'orderId': orderId, 'status': nextStatus}
            $.ajax({
                url: '/updateOrderStatus',
                type: 'POST',
                data: udata,
                dataType: 'json',
                success: (data) => {
                    window.location.reload(true);
                }
            }).fail(function($xhr) {
                var data = $xhr.responseJSON;
            });
        },

        cancelOrder: function(){
            console.log('cancel order')
            var orderId = this.get_order_id();
            var udata = {'orderId': orderId}
            $.ajax({
                url: '/cancelOrder',
                type: 'POST',
                data: udata,
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    if (data === "Succeeded!") {
                        window.location.href = "/portal?section=order";
                    }
                }
            }).fail(function($xhr) {
                var data = $xhr.responseJSON;
            });
        },
    },
});
