const path = require('path');
//const HtmlWebPackPlugin = require('html-webpack-plugin');
 
module.exports = {
    mode:'development',
    // 이 부분은 entry와 output의 기본값으로 생략 가능합니다.
    entry: {
        signin : './signin/page.js'//,
        // admin : '',
        // project_board : '',
        // project_choice : ''
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader:'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    }//,
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template:'./src/index.html',
    //         filename:'./index.html'
    //     })
    // ]
};
