const path = require('path')

// 这个配置文件, 其实就是一个 JS 文件, 通过 Node 中的模块操作, 向外暴露了一个配置对象
module.exports = {
    mode: 'development',
    devServer: {
        static: {
            // bundle.js '挂载'到的目录
            directory: path.join(__dirname, 'dist')
        }

        // static: "./dist"
    },
    // 在配置文件中需要手动指定入口和出口
    entry: './src/main.js',
    output: {
        // publicPath: './',
        // 输出文件相关的配置
        // 指定打包好的文件, 输出到哪个目录中去
        path: path.resolve(__dirname, './dist'),
        //  这是指定输出的文件的名称
        filename: 'bundle.js'
    }

}