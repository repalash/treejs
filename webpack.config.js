const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        tree: './src/index.js',
    },
    output: {
        filename: '[name].js',
        libraryExport: 'default',
        library: 'Tree',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "lazyStyleTag",
                            // Do not forget that this code will be used in the browser and
                            // not all browsers support latest ECMA features like `let`, `const`, `arrow function expression` and etc,
                            // we recommend use only ECMA 5 features,
                            insert: function insertIntoTarget(element, options) {
                                (options.target || document.head).appendChild(element);
                            },
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {postcssOptions:{
                            plugins: [
                                autoprefixer,
                            ],
                        }},
                    },
                    'less-loader',
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            '...' // adds the default terser,
        ],
    },
    plugins: [
        new webpack.BannerPlugin(
            'treejs\n@version 2.0.0\n@see https://github.com/repalash/treejs.git \nUpdated from version: 1.8.0 @see https://github.com/daweilv/treejs'
        ),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
