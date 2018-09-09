/**
 * Created by LiuJiang on 2018/8/1
 */
import $ from "jquery";
import "../../public/js/slide.js";

const detailHtml = require("./detail.html");

/**
 * 详情页面dom
 * @type {*|jQuery|HTMLElement}
 */
let $detailDom = $(detailHtml);

/**
 * 滑动速度
 * @type {number}
 */
let inSpeed = 400;
let outSpeed = 230;

export default {
    showOneDetail: function () {

        if ($("body #detailContainer").length) {
            prompt("详情已存在");
            return;
        }
        $("body").append("<div id='detailContainer'></div>");

        this.containSelector = "#detailContainer";

        $(this.containSelector).append($detailDom);
        $detailDom.slideLeft({
            speed: inSpeed, callback: () => {
                this.listenBack()
            }
        });
    },
    listenBack: function () {
        let $dom = $("#back");
        $dom.on("click", () => {
            this.back()
        });
        this.listenTouch(this.containSelector, (dx, dy) => {
            if (100 < dx && Math.abs(dy) < 50) {
                this.back();
            }
        });
    },
    back: function () {
        $detailDom.animate({left: $(window).width()}, outSpeed, null, () => {
            $detailDom.remove();
            $(this.containSelector).remove();
        });
    },
    checkParam: (param = {}, key = "@@$", type = undefined) => {
        if (typeof param !== "object") {
            this.prompt("param参数必须为Object ");
        }
        let keys = Object.keys(param);
        for (let i = 0; i < keys.length; i++) {
            if (key === keys[i] && typeof param[key] === type) {
                return true;
            }
        }
        let msg = "key:" + key + "，type:" + type + ";对应的值未找到";
        prompt(msg);
    },
    listenTouch: function (range, fn) {
        let startPosition, endPosition, deltaX, deltaY, moveLength;
        $(range).bind('touchstart', function (e) {
            var touch = e.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        }).bind('touchmove', function (e) {
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            };

            deltaX = endPosition.x - startPosition.x;
            deltaY = endPosition.y - startPosition.y;
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        }).bind('touchend', function (e) {
            if (deltaX < 0) { // 向左划动
                console.log("向左划动");
            } else if (deltaX > 0) { // 向右划动
                console.log("向右划动");
            }

            typeof fn === 'function' && fn(deltaX, deltaY);
        });
    }
};
/**
 * 提示方法，封装为方法便于调整
 * @param msg
 */
let prompt = msg => {
    throw new Error(msg || "程序异常");
};
