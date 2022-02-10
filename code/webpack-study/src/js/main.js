// 这是 main.js  是项目js入口文件

// 1.导入Jquery

// import *** from *** 是 ES6 中导入模块的方式
// 由于是 ES6 的语法, 太高级了, 浏览器解析不了
import $ from 'jquery'
// const $ = require('jquery')
$(function() {
    $('li:odd').css('backgroundColor', 'red')
    $('li:even').css('backgroundColor', function() {
        return '#' + 'D97634'
    })
})




// webpack 可以做什么?
// 1. webpack 能处理 JS 文件的互相依赖关系
// 2. webpack 能处理 JS 的兼容问题,把浏览器不识别的语法 转换为浏览器能识别的语法
// 命令格式:webpack 要打包的文件路径.js -o 打包后的输出路径.js