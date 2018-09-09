/**
 * Created by LiuJiang on 2018/9/4
 */
'use strict';
const path = require("path");

const merge = require('webpack-merge');

const base = require('./webpack.base.conf');

// process.env.NODE_ENV = "development";

module.exports = merge(base, {
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                // loader: 'url-loader?limit=8192&name=./public/images/[name].[hash].[ext]'
                loader: {
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        name: '[name].[hash].[ext]',
                        // limit: 8192, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        // outputPath: '/public/images' //定义输出的图片文件夹
                    }
                }
            }
        ]
    }
});
