const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");

// var website = {
//         publicPath: "localhost/"
//     },
module.exports = {
        entry: {
            entery: './src/entery.js',
            entery2: './src/entery2.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            //publicPath: website.publicPath
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: extractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
                {
                    test: /\.less$/,
                    use: [{
                            loader: "style-loader" // creates style nodes from JS strings
                        }, {
                            loader: "css-loader" // translates CSS into CommonJS
                                ,
                            {
                                loader: "less-loader" // compiles Less to CSS
                            }]
                    },
                    //解决的问题就是在hmtl文件中引入<img>标签的问题。
                    {
                        test: /\.(htm|html)$/i,
                        use: ['html-withimg-loader']
                    },
                    {
                        //test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
                        test: /\.(png|jpg|gif)/,
                        use: [{
                            loader: 'url-loader',
                            // limit： 是把小于500000B的文件打成Base64的格式， 写入JS
                            options: {
                                limit: 5000,
                                outputPath: 'images/'
                            }
                        }]
                    }
                ]
            },
            plugins: [
                new uglify(),
                new htmlPlugin({
                    minify: {
                        removeAttributeQuotes: true
                    },
                    hash: true,
                    template: './src/index.html'

                }),
                new extractTextPlugin("css/index.css")
            ],
            devServer: {
                contentBase: path.resolve(__dirname, 'dist'),
                host: 'localhost',
                compress: true,
                port: 1717
            }
        }