const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production", //production:最適化、developmen:ソースマップ対応

    // 編集・監視対象となるJavaScriptファイル
    entry: `./src/js/common.js`,

    // ファイルの出力設定
    output: {
        filename: "common.js" // 出力ファイル名・場所
    },

    optimization: {
        // LICENSE.txtファイルの作成を省略
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },

    plugins: [
        // jqueryを利用
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};