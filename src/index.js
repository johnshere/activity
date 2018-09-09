/**
 * Created by LiuJiang on 2018/9/5
 */
// const $ = require("jquery");
import $ from "jquery";
const entryJson = require("./entry.json");
//
console.log(1122333,entryJson);
console.log(1212345);

$(() => {
    $("html").css("font-size","16px");
    for (let k in entryJson){
        $("body").append("<a style='margin: 1rem;padding-left:3rem;font-size: 2rem;line-height: 2rem;display: block' href='"+entryJson[k]+"'>"+entryJson[k]+"</a></br>");
    }
});

