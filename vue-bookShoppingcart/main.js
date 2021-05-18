const app = new Vue({
    el: '#app',
    data: {
        books: [{
                id: 1,
                name: '《算法导论》',
                data: '2006-9',
                price: 85.00,
                count: 1.
            },
            {
                id: 2,
                name: '《UNIX编程艺术》',
                data: '2006-2',
                price: 59.00,
                count: 1,
            },
            {
                id: 3,
                name: '《编程珠玑》',
                data: '2008-10',
                price: 39.00,
                count: 1,
            },
            {
                id: 4,
                name: '《代码大全》',
                data: '2006-9',
                price: 128.00,
                count: 1
            }
        ]
    },
    methods: {
        // getFinalPrice(price) {
        //     return '￥' + price.toFixed(2) //保留两位小数
        // },
        increment(index) {
            this.books[index].count++;
        },
        decrement(index) {
            this.books[index].count--;
        },
        removeHandler(index) {
            this.books.splice(index, 1);
        },
    },
    filters: { //过滤器
        showPrice(price) {
            return '￥' + price.toFixed(2) //保留两位小数
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0;
            // for (let i = 0; i < this.books.length; i++) {
            //     totalPrice += this.books[i].price * this.books[i].count;
            // }
            for (let item of this.books) {
                totalPrice += item.price * item.count;
            }
            return totalPrice;
        }
    },

})