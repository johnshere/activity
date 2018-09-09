/**
 * 网上找的小插件,有问题：对定位设置有问题，已经修改
 * Created by LiuJiang on 2018/8/1
 */
let $ = require("jquery");
$.fn.slideRight = function ({p = 0, speed = 500, callback}) {
    //获取元素position
    // var position = this.css('position');
    // this.show().css({
    //     position: 'absolute',
    //     visibility: 'hidden'
    // });
    $('html,body').css({
        overflow: 'hidden',
        height: '100%'
    });
    //获取元素宽度
    var width = this.width() === 0 ? $(window).width() : this.width();

    //-------通过伸缩元素宽度实现动画-------
    //return this.css({
    //    top: $(window).scrollTop(),
    //    width: 0,
    //    position: position,
    //    visibility: 'visible',
    //    overflow: 'auto'
    //}).animate({ width: width }, speed, null, callback);

    //-------通过移动元素相对位置实现动画-------
    this.css({
        top: $(window).scrollTop(),
        left: -width,
        position: 'absolute',
        visibility: 'visible',
        overflow: 'auto',
    });
    return $(this).animate({left: p}, speed, null, callback);
};

$.fn.slideLeft = function ({p = 0, speed = 500, callback}) {
    //获取元素position
    // this.show().css({
    //     position: 'absolute',
    //     visibility: 'hidden'
    // });
    $('html,body').css({
        overflow: '',
        height: ''
    });
    //获取元素宽度
    // var width = this.width();
    var width = this.width() === 0 ? $(window).width() : this.width();

    //-------通过伸缩元素宽度实现动画-------
    //return this.css({
    //    top: 0,
    //    position: position,
    //    visibility: 'visible',
    //    overflow: 'auto'
    //}).animate({ width: 0 }, speed, null, callback);

    //-------通过移动元素相对位置实现动画-------
    this.css({
        position: 'absolute',
        left: width,
        top: 0,
        visibility: 'visible',
        overflow: 'auto'
    });
    return $(this).animate({left: p}, speed, null, callback);
};
$.fn.slideDown = function ({p = 0, speed = 500, callback}) {
    // this.show().css({
    //     position: 'absolute',
    //     visibility: 'hidden'
    // });
    $('html,body').css({
        overflow: 'hidden',
        height: '100%'
    });
    //获取元素高度
    var height = this.height() === 0 ? $(window).height() : this.height();
    //-------通过伸缩元素高度实现动画-------
    //return this.css({
    //    position: position,
    //    visibility: 'visible',
    //    overflow: 'auto',
    //    height: 0
    //}).animate({ height: height, top: $(window).scrollTop() }, speed, null, callback);

    //-------通过移动元素相对位置实现动画-------
    this.css({
        position: 'absolute',
        top: -height,
        left: 0,
        visibility: 'visible',
        overflow: 'auto'
    });
    return $(this).animate({top: p}, speed, null, callback);
};

$.fn.slideUp = function ({p = 0, speed = 500, callback}) {
    // this.show().css({
    //     position: 'absolute',
    //     visibility: 'auto'
    // });
    $('html,body').css({
        overflow: '',
        height: ''
    });
    //获取元素高度
    var height = $(window).height();
    //-------通过伸缩元素高度实现动画-------
    //return this.css({
    //    position: position,
    //    visibility: 'visible',
    //    overflow: 'hidden',
    //    height: height
    //}).animate({ height: 0 }, speed, null, callback);

    //-------通过移动元素相对位置实现动画-------
    this.css({
        position: 'absolute',
        top: height,
        left: 0,
        visibility: 'visible',
        overflow: 'auto'
    });
    return $(this).animate({top: p}, speed, null, callback);
};