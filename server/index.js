const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const koaStatic = require("koa-static-server");
const Koa = require('koa');
const httpProxy = require('http-proxy');
const KoaRouter = require('koa-router');
const exec = require('child_process').exec;

const app = new Koa();
const router = new KoaRouter();
const proxy = httpProxy.createProxyServer({});
const templatePath = path.resolve(__dirname, '../dist/index.html');
const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf-8') : "--";
const port = 80;
const maxage = 1000 * 60 * 60 * 24; // cookie有效时长

app.use(koaStatic({
    maxage,
    rootDir: './dist/static',
    rootPath: '/static'
}));

app.use(koaStatic({
    maxage,
    rootDir: './dist/favicon.ico',
    rootPath: '/favicon.ico'
}));

router.use(async(ctx, next) => {
    if (ctx.header && (ctx.header['x-forwarded-proto'] == "http" || ctx.header['X-Forwarded-Proto'] == "http") && process.env.NODE_ENV != "development") {
        ctx.redirect(ctx.href.replace("http://", "https://"));
        return false;
    }

    //健康检测Node是否正常访问
    if (['/ping', '/ping/health', '/view/tool/ping'].indexOf(ctx.url) > -1) {
        try {
            if (ctx.host === "TODO change production ip" && ['/view/tool/ping'].indexOf(ctx.url) > -1) {
                let postMessage = (shFile) => {
                    let userName = ctx.query.userName || "yifei.peng";
                    let stage = process.env.NODE_ENV;
                    let cmdStr = `sh -xe ${path.join(__dirname, shFile)} ${ctx.host} ${userName} ${stage}`;
                    exec(cmdStr, function (err, stdout, stderr) {
                        if (err) {
                            console.log('get weather api error:' + stderr);
                        } else {
                            console.log(stdout);
                        }
                    });
                };
                postMessage('./lark-message.sh');
            }
        } catch (e) {
        }
        ctx.body = "OK";
        return false;
    }
    await next();
});

process.env.NODE_ENV === 'test' && router.all('/dev*', (ctx, next) => {
    try {
        const { req, res } = ctx;
        const headers = req.headers;
        const target = headers['dev-base-url'];
        req.url = req.url.replace(/^\/dev/, '');

        console.log('dev', req.url, target);
        ctx.respond = false; // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
        proxy.web(req, res, {
            target,
            changeOrigin: true,
        });
        proxy.on('error', (err, req, res) => {
            res.writeHead(500, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(`
                <h1 style="color: red;">${err.message}</h1>
                <ul style="color: #3d3d3d!important; line-height: 1.6em;">
                    <li>
                        请确认Session Storage中的的baseURL已配置正确<br>
                        格式:http[s]://domain:port; <br>
                        e.g :http://10.200.16.29:3303
                    </li>
                    <li>请确认配置的服务已开启</li>
                </ul>
            `);
        });
    } catch (e) {}
});

router.get('*', async(ctx, next) => {
    ctx.res.setHeader('Content-Type', 'text/html');
    ctx.body = template;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, function() {
    console.log(chalk.green(`> Preview at  http://localhost:${port}`));
});
