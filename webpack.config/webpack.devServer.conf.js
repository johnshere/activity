/**
 * Created by LiuJiang on 2018/9/4
 */
'use strict';
const path = require("path");

const webpack = require("webpack");
const merge = require('webpack-merge');

const base = require('./webpack.base.conf');

// process.env.NODE_ENV = "development";

module.exports = merge(base, {
    mode: "development",
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, "../release"),//"../release_dev"),
        filename: "[name].[hash].js",
    },
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
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "../release"), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新,
        //服务器代理配置项
        proxy: {
            '/o2o/*':{
                target: 'http://test.wzt.169ol.com',//https://www.baidu.com',
                secure: true,
                changeOrigin: true
            }
        }
    }
});
