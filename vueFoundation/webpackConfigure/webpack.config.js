// node方法获取路径
const path = require('path')

module.exports = {
    // 定义入口
    entry: './src/main.js',

    // 定义出口
    output: {
        //应该为绝对路径，可以动态获取 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}