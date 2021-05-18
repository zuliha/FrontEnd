// node方法获取路径
const path = require('path')

module.exports = {
    // 定义入口
    entry: './src/main.js',

    // 定义出口
    output: {
        //应该为绝对路径，可以动态获取 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [{
                test: /\.css$/i,
                // css-loader负责加载css文件
                // style-loader负责将样式添加到DOM中
                // 使用多个loader时，是从右到左读取
                use: ["style-loader", "css-loader"]

            },
            // webpack 将 Less 编译为 CSS 的 loader, 将loader 添加到配置中去
            {
                test: /\.less$/i,
                use: [{
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 当加载的图片小于limit时，会将图片编译成base64字符串形式
                        // 当加载的图片大于limit时，需要使用file-loader模块进行加载
                        limit: 13000,
                        name: 'img/[name].[hash:8].[ext]' //规定打包后图片的名字
                    },
                }, ],
            },
        ]
    }
}