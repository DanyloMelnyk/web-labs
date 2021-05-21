const path = require('path');

const prod = true;

module.exports = {
    entry: './src/main/js/app.js',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js',
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        ],
    },
};

if (prod) {
    module.exports.mode = 'production';
} else {
    module.exports.mode = 'development';
    module.exports.devtool = 'eval-cheap-source-map';
    module.exports.watch = true;
}
