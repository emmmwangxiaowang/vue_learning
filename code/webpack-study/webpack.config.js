const path = require('path');
const { webpack, HotModuleReplacementPlugin } = require('webpack');
// 启用热更新的第二部
const webpaack = require('webpack')

// 独立加载css文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 将html页面加载到内存中
const htmlWebpackPlugin = require('html-webpack-plugin')

// 这个配置文件, 其实就是一个 JS 文件, 通过 Node 中的模块操作, 向外暴露了一个配置对象
module.exports = {
    mode: 'development',
    devServer: {
        // webpack 5 默认是自动打开热更新的
        // 启用热更新的第一步
        // hot: true,
        // 自动打开浏览器
        open: true,
        // 服务端口
        port: 8088,
        static: {
            // bundle.js '挂载'到的目录
            directory: path.join(__dirname, '/dist')
        }

        // static: "./dist"
    },
    // 配置插件的节点
    plugins: [
        // new 一个热更新的模块对象
        // 启动热更新 第三步
        // new HotModuleReplacementPlugin()

        new htmlWebpackPlugin({
            // 创建一个 在内存中生成 html 页面的插件

            // 指定模板页面, 将来会根据指定的页面路径生成到内存中 
            template: path.join(__dirname, './dist/index.html'),
            // 指定生存页面名称
            // webpack 5 默认是打开 index.html 其它暂不清楚
            filename: 'index.html',
            // 自动将 js css 等 引用到 head 中
            inject: 'head',
            // 清除注释
            minify: {
                removeComments: true,

            },
            // 清除内容为空的元素
            removeEmptyElemetns: true,
            // 以区分大小写的方式处理自定义标签内的属性
            caseSensitive: true
        }),
        new MiniCssExtractPlugin({
            attributes: {
                // 指定属性
                id: 'target'
            },
            linkType: 'text/css',
            // 开启禁用生成css 仍将被提取, 并可用自定义加载方法
            runtime: false
        })
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            // webpack 处理第三方文件类型的过程:
            // 1. 发现这个要处理的文件是不是JS文件, 然后就去配置文件中, 查找有没有对应的第三方 loader 规则
            // 2. 如果能找到对应的规则 , 就会调用对应的 loader 处理, 这种文件类型;
            // 3. 在调用loader 的时候 是从右往左调用的,
            // 4. 当最后的一个loader 调用完毕后, 会把 处理的结果直接交给 webpack 进行打包合并
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            // 配置处理 .less 文件的第三方 loader 规则
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            // 配置sass 除了安装 sass-loader 之外还要安装 node-sass
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }],
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