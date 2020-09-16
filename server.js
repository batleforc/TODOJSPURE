const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var Todo = require('./Routes/Todo')
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
var http = require('http').Server(app);
var port = process.env.PORT||3000;
const expressSwagger = require('express-swagger-generator')(app);
import {swaggerDocument} from './swagger'
expressSwagger(swaggerDocument)
app.use(express.json());
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath,
}));
app.use(require("webpack-hot-middleware")(compiler));
app.use('/',Todo);

http.listen(port, async ()=>{
  console.log(`Listen on :${port}`);
});