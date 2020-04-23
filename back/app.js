const Koa = require("koa");
const static = require("koa-static");
const koaBody = require("koa-body");
const cors = require("koa2-cors");

const mongoose = require("mongoose");
const path = require("path");
const chalk = require("chalk");

const registerRouters = require("./controller/index");
const config = require("./config");

const logger = require("./middleware/logger");
const token = require("./middleware/token");

app = new Koa();

// CORS
app.use(cors());
// HTTP请求日志
app.use(logger());
// token解析
app.use(token());
/**
 * mongondb
 */
mongoose
  .connect(config.database.local, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("[App] MongoDB connected success.");
    },
    err => {
      console.log(err);
      console.log("[App] MongoDB connected fail.");
    }
  );


// 静态文件
app.use(static(path.join(__dirname, "./public")));
// 解析POST请求体
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 400 * 1024 * 1024
    }
  })
);

// 注册路由
app.use(registerRouters());

// 定义404路由
app.use(ctx => {
  ctx.body = "<h1>Hello World.</h1>";
});

// 启动
app.listen(config.port);

console.log();
console.log(`${chalk.cyan("[App]: ")}service started  at port: ${config.port}`);
console.log();
