var path = require('path');

module.exports = {
    entry: "./app/App.jsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "main.js"       // название создаваемого файла
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [   //загрузчик для jsx
            {
                test: /\.jsx$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};