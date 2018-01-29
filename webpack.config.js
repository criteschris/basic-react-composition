const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        'app': './src/App.tsx',
        'composedapp': './src/ComposedApp.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader?silent=true'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}