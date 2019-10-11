const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './typescript.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name]_[hash:4]_bundle.js",
    },
    module: { // loader插件的配置都放在这儿
        rules: [
            {
                test: /\.tsx?$/, // 匹配所有的js 文件
                exclude: /(node_modules|bower_components|dist)/,
                use: {
                    loader: 'ts-loader', // 需要install  typescript  ts-loader
                }
            }
        ]
    },
    devServer: {
        overlay: true, // 错误信息写在html上
        hot: true,
        hotOnly: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './TypeScript.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}