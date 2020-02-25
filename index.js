const webpack = require('webpack');

const config = require('./webpack.config.js');

const compiler = webpack(config);

// app.use(
//     require('webpack-dev-middleware')(compiler, {
//         noInfo: true,
//         publicPath: webpackConfig.output.publicPath,
//     })
// );

compiler.watch({}, (x, y) => {
    // console.log(y.stats[0]);
    // console.log(y.stats);
    console.log('COMPILED');
});
