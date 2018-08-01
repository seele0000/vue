'use strict';
const db = require('./db');
const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');   // 解析post接收参数

/* 
  状态码：
  200： 成功
  300： 已存在
  400:  不存在
  500： 错误
*/

// 解决跨域问题
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// 解析post中body
app.use(bodyParser());

router.post('/message/insert', async (ctx, next) => {
  let paramO = ctx.request.body.params;
  let curDate = new Date();
  let year = curDate.getFullYear();
  let month = curDate.getMonth()+1;
  let day = curDate.getDate();        // 获取系统日，
  let hour = curDate.getHours();      // 获取系统时，
  let min = curDate.getMinutes();     // 分
  let second = curDate.getSeconds();  // 秒
  let curTime = year +'-'+ month +'-'+ day +' '+ hour +':'+ min +':'+ second;
  console.log('curTime',curTime)
  console.log('name',paramO.name)
  await db.message.create({
		movieId: paramO.movieId,
    title: paramO.title,
    msg: paramO.msg,
    time: curTime,
    name: paramO.name
	})
	.then(_data => {
    console.log('_data',_data.dataValues)
    ctx.body = {
      code: 200,
      msg: '提交成功'
    }
	})
	.catch(e => {
    console.log('error',e)
    ctx.body = {
      code: 500
    }
	});
});

router.post('/message/list', async (ctx, next) => {
  let paramO = ctx.request.body.params;
  let list = [];
  await db.message.findAll({
    attributes: ['id', 'movieId', 'title','msg', 'name', 'time'],
    where: {
      movieId: paramO.movieId
    }
  }).then(_data => {
    for(let i=0; i<_data.length; i++) {
      list.push(_data[i].dataValues)
    }
    ctx.body = {
      code: 200,
      data: list
    }
  }).catch(reject => {
    console.log(reject);
    ctx.body = {
      code: 500,
      data: _data[0].dataValues
    }
  });
});

router.post('/user/create', async (ctx, next) => {
  let userParamO = ctx.request.body.params;
  let o = {
    code: 0,
    data: {}
  };

  await db.user.create({
    name: userParamO.name,
    password: userParamO.password
  })
  .then(_data => {
    console.log('_data',_data.dataValues)
    ctx.body = {
      code: 200,
      msg: '成功'
    }
  })
  .catch(e => {
    console.log('error',e.errors)
    ctx.body = {
      code: 500,
      msg: e.errors[0].message
    } 
  })
});

router.post('/user/find', async (ctx, next) => {
  let userParamO = ctx.request.body.params;
  let code = 0;
  let msg = '';
  console.log(ctx.request.method)
  if (ctx.request.method == "OPTIONS") {
    ctx.body = 201;
  }
  await db.user.findAll({
    attributes: ['id', 'name', 'password'],
    where: {
      name: userParamO.name
    }
    }).then(_data => {
      if(userParamO.password == _data[0].dataValues.password) {
        code = 200;
        msg = 'ok';
      } else {
        code = 400;
        msg = '密码错误'
      }
      ctx.body = {
        code: code,
        msg: msg
      }
    }).catch(reject => {
      console.log(reject);
      ctx.body = {
        code: 500,
        msg: '用户名不存在'
      }
    });
});


app.use(router.routes());
app.listen(3000);
console.log('start 3000');