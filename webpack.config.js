const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        code: './src/plugin/controller.ts', // The entry point for your plugin code
        ui: './src/app/index.tsx', // The entry point for your UI code
    },

    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            {test: /\.css$/, loader: [{loader: 'style-loader'}, {loader: 'css-loader'}]},

            // EEnable SASS
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'}, // to inject the result into the DOM as a style block
                    {loader: 'css-modules-typescript-loader'}, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    {loader: 'css-loader', options: {modules: true}}, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    {loader: 'sass-loader'}, // to convert SASS to CSS
                    // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
                ],
            },

            // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
            {test: /\.(png|jpg|gif|webp|svg)$/, loader: [{loader: 'url-loader'}]},
        ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js']},

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],
});
