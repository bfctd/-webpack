// webpack --config configFile  指定打包文件打包命令，默认是webpack-config.js
const ExtractTextCss = require('extract-text-webpack-plugin');// 将css 打包进一个文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const path = require('path');

module.exports = (env, all) => {
    // console.log(env, all) // 可以拿到 webpack --config --env 命令行传入的参数
    console.log('------------------------------- new build -------------------------------')
    let base = {
        entry: {
            // app: ['babel-polyfill', './app.js'] // 引入babel-polyfill，promise ，文件会很大 install babel-polyfill
            app: ['./app.js', './hhh.ts']
            // app: './app.js'
        },
        optimization: {
            // minimize: true, //代码压缩
            splitChunks: { // 第三方的库文件分割
                name: true,
                chunks: 'all',
                //minSize: 100000, // 最小代码
                cacheGroups: { // 单独自定义分割代码
                    ts: { // webpack默认会把异步加载的打包为一个文件
                        // import("./a.js").then(module=>{})
                        test: /hhh/
                    }
                }
            },
            runtimeChunk: true // webpack代码
        },
        module: { // loader插件的配置都放在这儿
            rules: [
                {
                    test: /\.js$/, // 匹配所有的js 文件
                    // use: [{loader:'AA-loader'}, loader:'BB-loader'}], // 匹配到的js文件需要用到多个loader的时候
                    exclude: /(node_modules|bower_components|dist|fonts)/,
                    use: {
                        // loader: 'babel-loader',
                        // // 常用处理css有 css-loader，style-loader
                        // // 处理图片字体文件有 url-loader，image-loader，
                        // // 编译 有 less-loader，sass-loader
                        // // 语法糖有 vue-loader，ts-loader
                        // options: { // babel-loader的配置项
                        //
                        // }

                        loader: 'babel-loader', // 需要install  babel-loader @babel/core @babel/preset-env
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env'
                                ]
                            ],
                            plugins: [
                                ["@babel/transform-runtime"] //需要install @babel/plugin-transform-runtime @babel/runtime -S环境用
                            ]
                        }
                    }
                },
                {
                    test: /\.tsx?$/, // 匹配所有的js 文件
                    exclude: /(node_modules|bower_components|dist)/,
                    use: {
                        loader: 'ts-loader', // 需要install  typescript  ts-loader
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /(node_modules|bower_components|dist)/,
                    // 对于css的打包，引入需要 install css-loader style-loader , use从后往前执行
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                base: 1,
                                injectType: 'singletonStyleTag',
                                attributes: {
                                    'data-attrib': 'attribute'
                                }
                            }
                        },
                        {
                            loader: 'css-loader',
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|jpeg|webp)$/,
                    exclude: /(node_modules|bower_components|dist)/,
                    // 图片处理用到 install url-loader file-loader
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                outputPath: './img/',
                                publicPath: './img/',
                                limit: 8000,
                                name: '[name]_[hash:4].[ext]',
                                // fallback: 'responsive-loader'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    exclude: /(node_modules|dist)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: "[name]_[hash:4].[ext]",
                                outputPath: './fonts/',
                                publicPath: './fonts/',
                                limit: 1
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // new webpack.HotModuleReplacementPlugin(), // 热更新plugins
            new HtmlWebpackPlugin({
                template: './webpack_plugin_template.html',
                favicon: './favicon.ico',
                // meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
                // title: 'bo'
                // hash: true
            }), // html的打包

        ]
        // 常用plugin ：优化文件体积 有 commonsChunkPlugin(提取公共模块)，lifyjsWebpackPlugin(减小js文件体积，删除一些无用js代码)，PurifyCss
        // 额外功能 有 HtmlWebpackPlugin(打包结果自动引入html)
    }
    let pro = {
        mode: "production",
        output: {
            path: __dirname + '/dist',
            filename: "[name]_[chunkhash:4]_bundle.js",
            // path: path.resolve(__dirname, './dist'),
        },
        module: {
            rules: [
                {
                    test: /\.s[c|a]ss$/,
                    exclude: /(node_modules|bower_components|dist)/,
                    // 对于scss的编译需要sass-loader （node-sass 或者 dart-sass）
                    // 对于less的编译需要less-loader less
                    // use: [
                    //     {
                    //         loader: 'style-loader',
                    //         options: {
                    //             base: 1,
                    //             injectType: 'singletonStyleTag', // 将style打包进一个
                    //             attributes: {
                    //                 'data-attrib': 'attribute'
                    //             }
                    //         }
                    //     },
                    //     {
                    //         loader: 'css-loader',
                    //     },
                    //     {
                    //         loader: 'sass-loader'
                    //     }
                    // ]

                    // 把css代码放入一个文件中 需要install extract-text-webpack-plugin@next
                    use: ExtractTextCss.extract({
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                base: 1,
                                injectType: 'singletonStyleTag', // 将style打包进一个
                                attributes: {
                                    'data-attrib': 'attribute'
                                }
                            }
                        },
                        use: [
                            {
                                loader: 'css-loader',
                            },
                            // 对css内容处理如加前缀和css-next需install postcss postcss-loader autoprefixer postcss-cssnext
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        // require('autoprefixer')(), // 只安装一个即可，next包含了autoperfixer
                                        // require('postcss-cssnext')(), //postcss-preset-env
                                        require('postcss-preset-env')()
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextCss({filename: '[name]_[hash:4]_bundle.css'}), //把css代码放入一个文件中
            new CleanWebpackPlugin()
        ]
    }
    let dev = {
        mode: "development",
        devServer: {
            overlay: true, // 错误信息写在html上
            hot: true,
            hotOnly: true,
            proxy: {
                '/proxy': {
                    target: '//www.baidu.com/index.html',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/proxy': '' //重写
                    }
                }
            }
            // port: 8888 建议端口不要设置
        },
        module: {
            rules: [
                {
                    test: /\.s[c|a]ss$/,
                    exclude: /(node_modules|bower_components|dist)/,
                    // 对于scss的编译需要sass-loader （node-sass 或者 dart-sass）
                    // 对于less的编译需要less-loader less
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                base: 1,
                                injectType: 'singletonStyleTag', // 将style打包进一个
                                attributes: {
                                    'data-attrib': 'attribute'
                                }
                            }
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        }
    }

    // merge需要install webpack-merge --save-dev
    return marge(base, env === 'production' ? pro : dev)
    // return base
};