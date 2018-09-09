(function (global, factory) {

    if (typeof exports === 'object' && typeof module === 'object') {
        let $ = require("jquery");
        let Uri = require("./uri.js");
        module.exports = factory({Uri: Uri, $: $});
    } else if (typeof define === 'function' && define.amd) {
        define([], factory());
    } else if (typeof exports === 'object') {
        exports.ajaxconfig = factory();
    } else {
        global.ajaxconfig = factory();
    }
})(this, function ({Uri, $}) {

    /**
     * 组件名:ajaxutil<br/> 组件功能：一个ajax调用的工具类
     *
     * @exports ajaxUtil
     * @author kangjy ( liujiang 调整 )
     * @version 1.0
     * @class
     */
    var ajaxUtil = {};

    /**
     * 将json数据转换为formdata
     * @param url
     * @param fn
     * @param data
     */
    ajaxUtil.postFormData=function(url, fn, data){
        var uri = new Uri(url);

        if (typeof data === "object"){
            var formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            data = formData;
        }

        $.ajax({
            url: uri.toString(),
            type: "POST",
            data: data,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (retdata) {
                fn(retdata);
            },
            error: function (retdata) {
                var data = {
                    code: "0001",
                    message: "",
                    promptMsg: "ajax调用失败"
                };
                fn(data);
            }
        });
    };
    /**
     * @description 异步获取远程的html
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据
     */
    ajaxUtil.getHtml = function (url, fn, data) {
        ajaxUtil.getData(url, "html", fn, data);
    };
    /**
     * @description 异步获取js
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     */
    ajaxUtil.getJs = function (url, fn) {
        ajaxUtil.getData(url, "javascript", fn);
    };
    /**
     * @description 异步调用远程返回json字符串的服务
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据
     */
    ajaxUtil.getJson = function (url, fn, data) {
        ajaxUtil.getData(url, "json", fn, data);
    };
    /**
     * @description ajax获取远程数据
     * @param {number}
     *            url 请求url
     * @param {number}
     *            type 返回的内容类型[html,javascript,json]
     * @param {function}
     *            fn 异步调用完成后回到函数
     * @param {json}
     *            data 请求时候发送的数据
     */
    ajaxUtil.getData = function (url, type, fn, data) {
//		ajaxUtil.base(url, "get", type, fn, data, false,
//				"application/x-www-form-urlencoded");
        ajaxUtil.base(url, "get", type, fn, data, false,
            "application/json");
    };
    /**
     * @description 异步调用远程返回json字符串的服务
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据,json对象
     */
    ajaxUtil.postJson = function (url, fn, data) {
        ajaxUtil.base(url, "post", "json", fn, JSON.stringify(data), true,
            "application/json");
    };
    /**
     * @description 异步调用远程json服务
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据,json对象
     */
    ajaxUtil.putJson = function (url, fn, data) {
        ajaxUtil.base(url, "put", "json", fn, JSON.stringify(data), false,
            "application/json");
    };
    /**
     * @description 异步调用远程json的服务
     * @param {number}
     *            url 请求url
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据,json对象
     */
    ajaxUtil.deleteJson = function (url, fn, data) {
        ajaxUtil.base(url, "DELETE", "json", fn, JSON.stringify(data), false,
            "application/json");
    };

    /**
     * @description ajax获取远程数据
     * @param {number}
     *            url 请求url
     * @param {number}
     *            type 返回的内容类型[html,javascript,json]
     * @param {function}
     *            fn 异步调用完成后回到函数，接受的参数为ajaxPack对象
     * @param {json}
     *            data 请求时候发送的数据
     * @param {boolean}
     *            [async] 是否为异步调用，默认为true，false为同步调用
     * @param {string}
     *            [contentType] 请求参数类型
     */
    ajaxUtil.base = function (url, method, type, fn, data, async, contentType) {
        // var isconfig=false;
        // for(var i=0;i<config.length;i++){
        // 	var configurl=config[i];
        // 	if(url.indexOf(configurl)>-1){
        // 		isconfig=true;
        // 		break;
        // 	}
        // }
        // if(!isconfig){
        // 	url="/test"+url;
        // }
        var uri = new Uri(url);

        $.ajax({
            url: uri.toString(),
            type: method,
            async: async,
            contentType: contentType,
            cache: false,
            dataType: type,
            data: data,
            timeout: 60000,
            success: function (retdata) {
                fn(retdata);
            },
            error: function (retdata) {
                var data = {
                    code: "0001",
                    message: "",
                    promptMsg: "ajax调用失败"
                };
                fn(data);
            }
        });
    };
    return ajaxUtil;
});