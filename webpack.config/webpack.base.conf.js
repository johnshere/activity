/**
 * Created by LiuJiang on 2018/9/4
 */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entryUtil = require("./webpack.entry.util");
let entryJs = entryUtil.getEntryJs('../src/page/**/index.js');

let conf = {
    entry: entryJs,//js打包入口识别
    output: {
        path: path.resolve(__dirname, "../release"),
        filename: "[name].[chunkHash].js",
        // publicPath: "../../public"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader'
                // })
                use:[MiniCssExtractPlugin.loader,'css-loader']//'style-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
            {test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery"}
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: "index.html",
        //     template: "src/page/index.html",
        //     chunks: ["main", "vender"]
        // }),
        // new ExtractTextPlugin("./[name].[chunkHash].css")
        new CleanWebpackPlugin(["release"],{
            root: path.resolve(__dirname, ".."),
            verbose: true,
            dry: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:7].css",
            chunkFilename: "[name].[contenthash].css"
        })
    ],
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
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            layer: path.resolve(__dirname, "../src/public/js/layer/mobile/layer.js"),
            "layer.css": path.resolve(__dirname, "../src/public/js/layer/mobile/need/layer.css")
        }
    }
};
//HTML入口
let entryHtml = entryUtil.getEntryHtml('../src/page/**/index.html');

entryHtml.forEach(function (v) {
    conf.plugins.push(new HtmlWebpackPlugin(v));
});

module.exports = conf;