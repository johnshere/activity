/**
 * Created by LiuJiang on 2018/9/4
 */
'use strict';
const path = require("path");

const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge(base, {
    mode: "production",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "public/vendor",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                // loader: 'url-loader?limit=8192&name=./public/images/[name].[hash].[ext]'
                loader: {
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        name: '[name].[hash].[ext]',
                        limit: 10000, // 表示小于的图片转为base64,大于的是路径
                        outputPath: 'public/images' //定义输出的图片文件夹
                    }
                }
            }
        ]
    }
});
