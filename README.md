# 发电安全管理

## 目录结构说明

```
| public                      静态文件，构建时会直接复制
|       index.html
| server                      部署脚本，node服务
| src                         前端代码
|       api                   集中存放所有后端接口
|       assets                素材
|       components            通用|全局 组件
|-------router                路由管理相关
|     |     index.js          路由入口
|     |     guard.js          路由拦截器
|       store                 状态管理相关
|-------styles                全局导入的样式
|     |     variables.less    样式变量
|-------utils                 工具集合
|     |     filters           过滤器
|     |     index             通用工具函数
|     |     regExp            正则表达式
|     |     request           网络请求
|     |     storage           localStorage工具
|     |     ws                Websocket工具
|-------views                 页面
|     |     */components      页面相关组件
|       App.vue
|       config.js             程序配置
|       main.js               程序入口
|       shims-tsx.d.js        全局ts接口定义
|       shims-vue.d.js        vue相关接口定义
|       .env.*                各环境配置
```

## 使用TypeScript的范围

因为目前使用的vue2对ts的支持有限，所以仅在`.ts`文件中使用ts，不要在`.vue`中使用。

## interface

高频使用/全局的`interface`定义在`src/shims-tsx.d.js`中，这个文件中定义的interface在整个工程中直接访问

```
ServerResponse 网络响应接口，request函数的响应接口
```

## icon管理

所有icon使用 [iconfont](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1676264) 进行管理,采用Symbol的方式，为防止icon丢失，项目中的icon只可以新增，不允许`删除`，有新增icon后刷新iconfont中的cdn链接，将链接直接置于`/public/index.html`中

## 接口定义规范

和后端约定，所有的接口都是post，所以request已经写了默认的请求方式是post，api下的接口封装不需要写method。

后端接口需要按照业务模块封装到`src/api`目录下，每个接口都需要明确声明入参，如果出参有需要备注的字段可通过ServerResponse的泛型进行声明

## 路由配置说明

路由使用vue-router进行管理，工程中有一些通过vue-router的配置来控制业务流程和页面展示的字段，详细查看[router/index.js](./src/router/index.js)头部注释。

## 服务部署

```shell
|server
|       build.sh  用于jenkins执行的构建;
|       index.js  启动node站点服务;
|       lark-message.sh   部署后微信消息通知
|       nodeappctl.sh     用于deployer执行，将jenkins构建结果部署到服务器



jenkins执行命令为： sh -xe server/build.sh <test|staging|production>
deployer执行命令为： sh /data/svn-xue-teacher-frontend/nodeapp/server/nodeappctl.sh <test|staging|production> 2>&1
```
