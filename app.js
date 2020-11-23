const koa = require('koa');
var middlewares = require('koa-middlewares');
const serve = require('koa-static');
var bodyParser = require('koa-bodyparser');

const  logger = require('koa-logger');
const jsonp = require('koa-jsonp');
const router = require('./routes')
// var render = require('./config/render');
// var config = require('./config/config')();

var app = new koa();
app.use(logger())
app.use(jsonp())
app.use(bodyParser());

//db.connect
require("./config/db.connect")();


app.use(router.routes());
app.use(router.allowedMethods());
app.use(require('./middleware/errHandler'))

app.listen(3001 )
console.log("server running at 3001")
