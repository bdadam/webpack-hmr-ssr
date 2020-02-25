const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

// const isDev = false;
const isDev = true;

module.exports = [
    {
        name: 'Client',
        context: path.resolve(__dirname),
        devtool: isDev ? 'cheap-module-source-map' : 'source-map',
        mode: isDev ? 'development' : 'production',
        optimization: {
            // minimize: true,
            minimize: false,
            minimizer: [
                new TerserPlugin({ sourceMap: true }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: {
                            inline: false,
                            annotation: true,
                        },
                    },
                }),
            ],
        },
        entry: {
            // client: ['webpack/hot/poll?300', './src/client.js'],
            // client: ['webpack/hot/poll?300', './src/client.js'],
            client: ['./src/client.js'],
            // client: ['webpack-dev-server/client', './src/client.js'],
        },
        // output: {
        //     filename: '[name].[hash:9].min.js',
        // },
        plugins: [
            // new WebpackBar({ name: 'Client' }),
            //
            new ManifestPlugin(),
            // new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
            }),
        ],
        stats: false,
        // stats: 'minimal',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            hot: true,
            quiet: true,
            writeToDisk: true,
            proxy: {
                '*': 'http://localhost:7000',
            },
            stats: 'errors-only',
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                // importLoaders: 1,
                                // modules: false,
                                // minimize: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                // strictMath: true,
                                // noIeCompat: true,
                            },
                        },
                    ],
                },
            ],
        },
    },
    {
        target: 'node',
        externals: [
            nodeExternals({
                whitelist: ['webpack/hot/poll?300', /\.(css|scss|sass|sss|less)$/],
            }),
        ],
        resolve: {
            extensions: ['.js', '.less'],
        },

        // resolve: {
        //     alias: {
        //         'webpack/hot/poll': require.resolve('webpack/hot/poll'),
        //     },
        // },
        name: 'Server',
        context: path.resolve(__dirname),
        devtool: 'source-map',
        mode: 'development',
        entry: {
            // app: './src/server/app.js',
            //'webpack/hot/poll?1000'
            server: ['webpack/hot/poll?300', './src/server.js'],
            // server: './src/server.js',
        },
        output: {
            filename: '[name].js',
        },
        plugins: [
            // new WebpackBar({ name: 'Server' }),
            // new webpack.HotModuleReplacementPlugin({ quiet: true }),
            // new webpack.IgnorePlugin({resourceRegExp, contextRegExp});
            // resourceRegExp: /^\.\/locale$/,
            new webpack.IgnorePlugin({ resourceRegExp: /\.less$/ }),
            new webpack.HotModuleReplacementPlugin(),
            new StartServerPlugin({
                name: 'server.js',
                nodeArgs: ['--inspect', '-r', 'source-map-support/register'], // allow debugging
                // args: ['scriptArgument1', 'scriptArgument2'], // pass args to script
                // signal: false | true | 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
                // keyboard: true | false, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
            }),
        ],
        stats: 'errors-only',
        module: {
            // loaders: [{ test: /\.less$/, loader: 'ignore-loader' }],
        },
    },
    // {
    //     target: 'node',
    //     externals: [nodeExternals()],
    //     name: 'Server',
    //     context: path.resolve(__dirname),
    //     devtool: 'source-map',
    //     mode: 'development',
    //     entry: {
    //         serverapp: './src/server/app.js',
    //     },
    //     // output: {

    //     // },
    //     plugins: [
    //         new WebpackBar({ name: 'Server' }),
    //         // new StartServerPlugin({
    //         //     name: 'server.js',
    //         //     nodeArgs: ['--inspect'], // allow debugging
    //         //     // args: ['scriptArgument1', 'scriptArgument2'], // pass args to script
    //         //     // signal: false | true | 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
    //         //     // keyboard: true | false, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
    //         // }),
    //     ],

    //     // stats: false,
    // },
];
