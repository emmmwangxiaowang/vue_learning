// 这是 main.js  是项目js入口文件

// 1.导入Jquery
import $ from 'jquery';

// import $ from 'element-ui';
// webpack 默认只能打包处理 JS 类型的文件, 无法处理其它的非 jS 类型的文件
// 如果要处理非 JS 类型的文件, 需要安装合适的第三方 loader 加载器
// const $ = require('jquery')
$(function() {
    $('li:odd').css('backgroundColor', 'green')
    $('li:even').css('backgroundColor', function() {
        return '#' + 'D97634'
    })
})

// class 关键字,是ES6 中提供的信誉发, 用来实现ES6 面向对象编程的方式
class Person {
    static info = { name: '蒋莹莹', age: 20 }
}

console.log(Person.info)






// webpack 可以做什么?
// 1. webpack 能处理 JS 文件的互相依赖关系
// 2. webpack 能处理 JS 的兼容问题,把浏览器不识别的语法 转换为浏览器能识别的语法
// 命令格式:webpack 要打包的文件路径.js -o 打包后的输出路径.js


// 使用 webpack-ddev-server 这个工具, 来实现自动打包编译的功能
// 1. 运行 npm install webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
// 2. 安装完毕后, 这个工具的用法 和webpack 命令的用法完全一样
// 3. 由于,实在项目中,本地安装的 web-dev-server, 所以, 无法把它当作脚本命令 在 power shell 终端中直接运行
// 只有那些 安装到 全局 -g 的工具才能在终端中正常执行

// 4. 注意： webpack-dev-server 这个工具 如哦想要正常运行，必须在本地项目中安装 webpack
// 5.webpack-dev-server 帮我们打包生成的bundle.js 文件， 并没有存放到实际的物理磁盘上,而是直接托管到了
// 电脑的内存中, 所以我们在项目的根目录中,根本找不到这个打包好的 bundle.js

// webpack 5 需要把 index.html 放在和 outputpath 相同路径('挂载'的路径)