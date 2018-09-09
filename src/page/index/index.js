/**
 * Created by LiuJiang on 2018/7/31
 */
import "../../public/css/style.min.css";
import "../../public/css/common.css";

import html5shiv from "../../public/js/html5shiv.js";
import rem from "../../public/js/rem.js";
// import $ from "jquery";
import fastclick from "../../public/js/fastclick.js";

var $ = require("jquery");

import ajax from "../../public/js/ajax.util.js";

import mainHtml from "./main.html";
import detail from "./detail";

import layer from "layer";
import "layer.css";

import "./test.css";

$(function () {
    // window.location.href="../broadInfo/index.html";

    $("body").append('<div>' + mainHtml + '</div>');

    $(".page-main ul.question-list li.question").click(function () {
        detail.showOneDetail();
    });

    // 全部商品切换
    $(".js-search-type").on("click", function () {
        $(".condition").toggleClass("on");
        $(".mask").toggleClass("on");
    });
    $(".condition-slide").on("click", "li", function () {
        var text = $(this).text();
        $(this).addClass("active").siblings().removeClass("active");
        $(".js-search-type .text").text(text);
        $(".condition").removeClass("on");
        $(".mask").removeClass("on");
    });

    console.log(layer);
    layer.open({content:"asjdhfjah", btn:"知道了"});

    var param = {};
    ajax.postFormData("/wxxcx/sclt_query.php", function (resp) {
        console.log(resp);
    },param);

});

