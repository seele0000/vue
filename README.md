# vuedemo

> 豆瓣电影
# 介绍

1. 使用vue-cli搭建项目，增加sass预处理，修改部分eslint规则
2. 主要页面为pages下的 home（首页）、list（正在热映、top250）、detail（详情页）、searchList（搜索结果页）、预留templete模板文件夹。
3. 将头部（my-header）、登录框（register）设为组件
4. 在 ```/config/index.js``` 中设置开发环境（dev）接口跨域代理```proxyTable```相关配置，在```/config/dev.env.js```和```/config/prod.eng.js```中配置```API_ROOT```地址
5. ```/server```中使用koa2搭建简易后台接口，使用sequelize操作MySQL数据库，共设用户登录/注册、留言列表查询/添加（在创建用户时，添加sequelize验证validate）

