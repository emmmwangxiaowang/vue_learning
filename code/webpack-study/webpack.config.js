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
            // linkType: 'text/css',
            // 开启禁用生成css 仍将被提取, 并可用自定义加载方法
            runtime: false
        })
    ],
    module: {
        // css sass less 文件改变了不光需要重新打包, 在这之前还要重新'挂载'到内存
        // webpack ./src/css/* -o ./dist
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
        }, {
            // 处理图片路径的 loader
            test: /\.jgp|png|gif|jpeg|bmp$/,
            // use: 'url-loader?limit=90000$name=[hash:8]-[name].[ext]',
            // limit 给定的值, 是图片的大小, 大卫是byte, 如果我们引用的图片 ,大于或等于给定的 limit值, 则 不会被转为base64 格式的字符串,
            // 如果 图片小于给定的limit 值, 则 会被转为 base64 的字符串

            type: 'asset//resource'


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
        filename: 'bundle.js',

        // webpack5 使用资源模块来代替 原来的 file-loader url-loader 等loader
        // 资源模块”类型有四种。
        // asset/resource： 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
        // asset / inline： 导出一个资源的 data URI。 之前通过使用 url - loader 实现。
        // asset / source： 导出资源的源代码。 之前通过使用 raw - loader 实现。
        // asset： 在导出一个 data URI 和发送一个单独的文件之间自动选择。 之前通过使用 url - loader， 并且配置资源体积限制实现。

        assetModuleFilename: '[hash:8]-[name][ext][query]'
    }

    // {
    //     "presets": ["env", "stage-o"]
    //      "plugins": ["transform-runtime"]
    // }

}