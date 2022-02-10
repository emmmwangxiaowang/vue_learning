const path = require('path')
    // 这个配置文件 其实就是一个 JS 文件 ,通过 node 中的模块操作, 向外暴露了一个配置对象
module.exports = {
    // 入口:  表示要用 webpack 打包 哪个文件
    entry: path.join(__dirname, './src/js/main.js'),
    // 出口: 输出文件相关的配置
    output: {
        // 指定打包好文件输出到哪个目录
        path: path.join(__dirname, './dist/bundle.js'),
        // 指定输出文件的名称
        filename: 'main.js'
    }
}

// 当我们在控制台直接输入webpack 命令执行的时候, webpack 做了以下几步
// 1. 首先, webpack 发现 我们并没有通过命令的形式 给它指定入口和出口
// 2. webpack 就会去 项目的根目录中, 查找一个叫做 `webpack.config.js` 的配置文件
// 3. 当找到配置文件后, webpack 会去 解析执行这个配置文件,当解析执行玩配置文件后, 就得到了配置文件中导出的配置文件对象
// 4. 当 webpack 拿到 配置对象之后, 就拿到了配置对象中 指定的入口和出口, 执行构建